#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { getEbayConfig } from './config/environment.js';
import { EbaySellerApi } from './api/index.js';
import { getToolDefinitions, executeTool } from './tools/index.js';

/**
 * eBay API MCP Server
 * Provides access to eBay Sell APIs through Model Context Protocol
 */
class EbayMcpServer {
  private server: Server;
  private api: EbaySellerApi;

  constructor() {
    this.server = new Server(
      {
        name: 'ebay-api-mcp-server',
        version: '0.1.0'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    // Initialize eBay API client
    const config = getEbayConfig();
    this.api = new EbaySellerApi(config);

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupHandlers(): void {
    // Handle tool listing
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: getToolDefinitions()
      };
    });

    // Handle tool execution
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        const result = await executeTool(this.api, name, args || {});

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        if (errorMessage.includes('authentication') || errorMessage.includes('401')) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Authentication failed: ${errorMessage}`
          );
        }

        throw new McpError(
          ErrorCode.InternalError,
          `Tool execution failed: ${errorMessage}`
        );
      }
    });
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('eBay API MCP Server running on stdio');
  }
}

// Start the server
const server = new EbayMcpServer();
server.run().catch((error) => {
  console.error('Fatal error running server:', error);
  process.exit(1);
});
