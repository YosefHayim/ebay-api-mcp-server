/**
 * eBay API MCP Server for Cloudflare Workers
 *
 * This server implements:
 * - HTTP transport for MCP
 * - Streamable HTTP transport (SSE fallback)
 * - OAuth 2.1 authorization ready
 * - KV-based session storage
 */

import { randomUUID } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { EbaySellerApi } from '@/api/index.js';
import { getToolDefinitions, executeTool } from '@/tools/index.js';
import type { EbayConfig } from '@/types/ebay.js';

/* eslint-disable @typescript-eslint/naming-convention */
interface Env {
  // eBay API credentials
  EBAY_CLIENT_ID: string;
  EBAY_CLIENT_SECRET: string;
  EBAY_REDIRECT_URI: string;
  EBAY_ENVIRONMENT: 'production' | 'sandbox';
  EBAY_USER_REFRESH_TOKEN?: string;

  // MCP OAuth settings (future enhancement)
  OAUTH_CLIENT_ID?: string;
  OAUTH_CLIENT_SECRET?: string;
  OAUTH_AUTH_SERVER_URL?: string;
  OAUTH_REQUIRED_SCOPES?: string;
  OAUTH_ENABLED?: string;

  // KV namespace for session storage
  OAUTH_KV: KVNamespace;

  // Cookie encryption
  COOKIE_ENCRYPTION_KEY?: string;
}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * CORS headers
 */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Mcp-Session-Id',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id',
};

/**
 * MCP session storage (in-memory for this worker instance)
 * Note: For production, consider using Durable Objects for persistent sessions
 */
const transports = new Map<string, StreamableHTTPServerTransport>();

/**
 * Create MCP server instance
 */
function createMcpServer(env: Env): McpServer {
  const ebayConfig: EbayConfig = {
    clientId: env.EBAY_CLIENT_ID,
    clientSecret: env.EBAY_CLIENT_SECRET,
    redirectUri: env.EBAY_REDIRECT_URI,
    environment: env.EBAY_ENVIRONMENT || 'sandbox',
  };

  const api = new EbaySellerApi(ebayConfig);

  const server = new McpServer(
    {
      name: 'ebay-api-mcp-server',
      version: '1.2.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Register tools
  const tools = getToolDefinitions();
  for (const toolDef of tools) {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inputSchema: toolDef.inputSchema as any,
      },
      async (args: Record<string, unknown>) => {
        try {
          const result = await executeTool(api, toolDef.name, args);
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';

          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify({ error: errorMessage }, null, 2),
              },
            ],
            isError: true,
          };
        }
      }
    );
  }

  return server;
}

/**
 * Handle MCP POST endpoint
 */
async function handleMcpPost(request: Request, env: Env): Promise<Response> {
  const sessionId = request.headers.get('mcp-session-id');
  const body = await request.json();

  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports.has(sessionId)) {
    transport = transports.get(sessionId)!;
  } else if (!sessionId && isInitializeRequest(body)) {
    // Create new session
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: sessionId => {
        transports.set(sessionId, transport);
        console.log(`✓ New MCP session initialized: ${sessionId}`);
      },
    });

    transport.onclose = () => {
      if (transport.sessionId) {
        transports.delete(transport.sessionId);
        console.log(`✓ MCP session closed: ${transport.sessionId}`);
      }
    };

    const server = createMcpServer(env);
    await server.connect(transport);
  } else {
    return new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Bad Request: No valid session ID provided',
        },
        id: null,
      }),
      {
        status: 400,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // Create minimal Request/Response for transport
  const req = {
    method: request.method,
    url: new URL(request.url),
    headers: Object.fromEntries(request.headers.entries()),
  } as any;

  const res = {
    status: 200,
    headers: {} as Record<string, string>,
    body: '',
    writeHead(status: number, headers: Record<string, string>) {
      this.status = status;
      this.headers = headers;
    },
    write(chunk: string) {
      this.body += chunk;
    },
    end() {
      // No-op
    },
  } as any;

  await transport.handleRequest(req, res, body);

  return new Response(res.body, {
    status: res.status,
    headers: {
      ...CORS_HEADERS,
      ...res.headers,
    },
  });
}

/**
 * Handle MCP session request (GET/DELETE)
 */
async function handleSessionRequest(request: Request): Promise<Response> {
  const sessionId = request.headers.get('mcp-session-id');
  if (!sessionId || !transports.has(sessionId)) {
    return new Response(
      JSON.stringify({
        error: 'invalid_session',
        error_description: 'Invalid or missing session ID',
      }),
      {
        status: 400,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const transport = transports.get(sessionId)!;

  // Create minimal Request/Response for transport
  const req = {
    method: request.method,
    url: new URL(request.url),
    headers: Object.fromEntries(request.headers.entries()),
  } as any;

  const res = {
    status: 200,
    headers: {} as Record<string, string>,
    body: '',
    writeHead(status: number, headers: Record<string, string>) {
      this.status = status;
      this.headers = headers;
    },
    write(chunk: string) {
      this.body += chunk;
    },
    end() {
      // No-op
    },
  } as any;

  await transport.handleRequest(req, res);

  return new Response(res.body, {
    status: res.status,
    headers: {
      ...CORS_HEADERS,
      ...res.headers,
    },
  });
}

/**
 * Handle health check endpoint
 */
function handleHealth(env: Env): Response {
  return new Response(
    JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: env.EBAY_ENVIRONMENT,
      oauth_enabled: env.OAUTH_ENABLED !== 'false',
    }),
    {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
    }
  );
}

/**
 * Handle OAuth metadata endpoint
 */
function handleOAuthMetadata(request: Request, env: Env): Response {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const metadata = {
    resource: baseUrl,
    authorization_servers: [env.OAUTH_AUTH_SERVER_URL],
    scopes_supported: (env.OAUTH_REQUIRED_SCOPES || 'mcp:tools').split(',').map(s => s.trim()),
    bearer_methods_supported: ['header'],
    resource_signing_alg_values_supported: ['RS256'],
    resource_documentation: 'https://github.com/YosefHayim/ebay-api-mcp-server',
    resource_policy_uri: `${baseUrl}/policy`,
  };

  return new Response(JSON.stringify(metadata, null, 2), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Main request handler
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    // Route requests
    switch (url.pathname) {
      case '/health':
        return handleHealth(env);

      case '/.well-known/oauth-protected-resource':
        return handleOAuthMetadata(request, env);

      case '/':
        // MCP endpoints
        if (request.method === 'POST') {
          return await handleMcpPost(request, env);
        } else if (request.method === 'GET' || request.method === 'DELETE') {
          return await handleSessionRequest(request);
        }
        return new Response('Method Not Allowed', {
          status: 405,
          headers: CORS_HEADERS,
        });

      default:
        return new Response('Not Found', {
          status: 404,
          headers: CORS_HEADERS,
        });
    }
  },
};
