/**
 * Interactive Setup for eBay API MCP Server
 *
 * A beautiful CLI experience for configuring eBay API credentials and tokens.
 * Run: npm run setup
 */

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable n/no-process-exit */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import prompts from 'prompts';
import chalk from 'chalk';
import { readFileSync, writeFileSync, existsSync, copyFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir, platform } from 'os';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '../..');

// ═══════════════════════════════════════════════════════════════════════════
// eBay Logo and Branding
// ═══════════════════════════════════════════════════════════════════════════

// Helper function to create clickable links in terminal
function createClickableLink(text: string, url: string): string {
  // ANSI escape sequence for hyperlinks: \x1b]8;;URL\x1bBACKSLASH followed by text, then close
  return `\x1b]8;;${url}\x1b\\${text}\x1b]8;;\x1b\\`;
}

const EBAY_LOGO = `
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║     ███████╗██████╗  █████╗ ██╗   ██╗                     ║
║     ██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝                     ║
║     █████╗  ██████╔╝███████║ ╚████╔╝                      ║
║     ██╔══╝  ██╔══██╗██╔══██║  ╚██╔╝                       ║
║     ███████╗██████╔╝██║  ██║   ██║                        ║
║     ╚══════╝╚═════╝ ╚═╝  ╚═╝   ╚═╝                        ║
║                                                            ║
║              🔌 API MCP Server Setup 🚀                    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`;

const CREATOR_CREDIT = `
   ╔═══════════════════════════════════════════════════════╗
   ║  Creator: ${chalk.cyan('YosefHayim')}                                 ║
   ║  ${createClickableLink(chalk.blue.underline('linkedin.com/in/yosef-hayim-sabag'), 'https://www.linkedin.com/in/yosef-hayim-sabag/')}      ║
   ╚═══════════════════════════════════════════════════════╝
`;

const OAUTH_SETUP_INFO = `
${chalk.bold.yellow('⚠️  IMPORTANT: OAuth Setup Requirements')}

${chalk.bold.white('This is a local MCP server, eBay OAuth only works with HTTPS.')}

${chalk.bold.cyan('Two Setup Options:')}

  ${chalk.green('1. For API Testing Only (Recommended for Beginners)')}
     ${chalk.gray('   • No OAuth needed! Just ask the LLM about schemas and endpoints')}
     ${chalk.gray('   • Perfect for understanding how to structure API requests')}
     ${chalk.gray('   • Limited to read-only operations')}

  ${chalk.yellow('2. Full API Access (Requires OAuth - One-Time Setup)')}
     ${chalk.gray('   • First time: Manual OAuth URL decode required')}
     ${chalk.gray('   • Get your refresh token once, use forever')}
     ${chalk.gray('   • After setup: Everything is automated')}
     ${chalk.gray('   • Full read/write access to eBay APIs')}

${chalk.bold.magenta('📝 Quick Steps for OAuth:')}
  ${chalk.white('1.')} Run this setup to save your Client ID & Secret
  ${chalk.white('2.')} Use ${chalk.cyan('ebay_get_oauth_url')} tool to get OAuth URL
  ${chalk.white('3.')} Visit URL, authorize, copy callback URL
  ${chalk.white('4.')} Manually decode the callback URL once to get tokens
  ${chalk.white('5.')} Save refresh token - ${chalk.green('done! Everything else is automatic')}

${chalk.gray('━'.repeat(70))}
`;

const WELCOME_MESSAGE = `
${chalk.bold.white('Welcome to the Setup Wizard! 🚀')}

${chalk.bold.cyan('What You Need:')}
  ${chalk.gray('•')} eBay Client ID & Secret (from developer.ebay.com)
  ${chalk.gray('•')} Redirect URI (RuName from eBay Developer Portal)
  ${chalk.gray('•')} Optional: User tokens for higher rate limits

${chalk.bold.green('✨ Features:')}
  ${chalk.gray('•')} Preserves existing configuration
  ${chalk.gray('•')} Smart defaults and validation
  ${chalk.gray('•')} Automatic MCP client setup

${chalk.gray('━'.repeat(70))}
`;

// ═══════════════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════════════

function displayLogo() {
  console.clear();
  console.log(EBAY_LOGO);
  console.log(CREATOR_CREDIT);
}

function displayWelcome() {
  displayLogo();
  console.log(OAUTH_SETUP_INFO);
  console.log(WELCOME_MESSAGE);
}

function validateRequired(value: string): boolean | string {
  return value.trim().length > 0 || 'This field is required';
}

function validateToken(value: string): boolean | string {
  if (!value) return true; // Optional field
  if (!value.startsWith('v^1.1#')) {
    return 'Token should start with "v^1.1#"';
  }
  return true;
}

function loadExistingConfig(): Record<string, string> {
  const envPath = join(PROJECT_ROOT, '.env');
  const config: Record<string, string> = {};

  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');

    for (const line of lines) {
      if (line.trim() && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').trim();
        if (key && value && !value.includes('_here')) {
          config[key.trim()] = value;
        }
      }
    }
  }

  return config;
}

function saveConfig(config: Record<string, string>) {
  const envPath = join(PROJECT_ROOT, '.env');

  const envContent = `###############################################################################
# eBay API MCP Server - Environment Configuration
# Generated: ${ new Date().toISOString() }
###############################################################################

# ═══════════════════════════════════════════════════════════════════════════
# REQUIRED: eBay API Credentials
# ═══════════════════════════════════════════════════════════════════════════

EBAY_CLIENT_ID = ${ config.EBAY_CLIENT_ID }
EBAY_CLIENT_SECRET = ${ config.EBAY_CLIENT_SECRET }

# Environment: "sandbox"(testing) or "production"(live eBay)
EBAY_ENVIRONMENT = ${ config.EBAY_ENVIRONMENT }

# Redirect URI(RuName): Required for user OAuth flow
EBAY_REDIRECT_URI = ${ config.EBAY_REDIRECT_URI }

# ═══════════════════════════════════════════════════════════════════════════
# OPTIONAL: User OAuth Tokens(Recommended for high rate limits)
# ═══════════════════════════════════════════════════════════════════════════
# Benefits: 10,000 - 50,000 requests / day vs 1,000 / day with app tokens

${ config.EBAY_USER_ACCESS_TOKEN ? `EBAY_USER_ACCESS_TOKEN=${config.EBAY_USER_ACCESS_TOKEN}` : '# EBAY_USER_ACCESS_TOKEN=' }
${ config.EBAY_USER_REFRESH_TOKEN ? `EBAY_USER_REFRESH_TOKEN=${config.EBAY_USER_REFRESH_TOKEN}` : '# EBAY_USER_REFRESH_TOKEN=' }

# ═══════════════════════════════════════════════════════════════════════════
# OPTIONAL: App OAuth Token(Auto - generated if not provided)
# ═══════════════════════════════════════════════════════════════════════════

${ config.EBAY_APP_ACCESS_TOKEN ? `EBAY_APP_ACCESS_TOKEN=${config.EBAY_APP_ACCESS_TOKEN}` : '# EBAY_APP_ACCESS_TOKEN=' }
`;

  writeFileSync(envPath, envContent);
}

function getConfigPaths() {
  const home = homedir();
  const os = platform();
  const paths: Record<string, string> = {};

  if (os === 'darwin') {
    paths.claude = join(home, 'Library/Application Support/Claude/claude_desktop_config.json');
  } else if (os === 'win32') {
    paths.claude = join(home, 'AppData/Roaming/Claude/claude_desktop_config.json');
  } else {
    paths.claude = join(home, '.config/Claude/claude_desktop_config.json');
  }

  paths.gemini = join(home, '.config/gemini/config.json');
  paths.chatgpt = join(home, '.config/chatgpt/config.json');

  return paths;
}

function detectMCPClients() {
  const configPaths = getConfigPaths();
  const detected: string[] = [];

  for (const [name, path] of Object.entries(configPaths)) {
    if (existsSync(path) || existsSync(dirname(path))) {
      detected.push(name);
    }
  }

  return detected;
}

function backupEnvFile(): string | null {
  const envPath = join(PROJECT_ROOT, '.env');
  if (!existsSync(envPath)) {
    return null;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const backupPath = join(PROJECT_ROOT, `.env.backup.${timestamp}`);

  copyFileSync(envPath, backupPath);
  return backupPath;
}

function resetEnvFile(): boolean {
  const envPath = join(PROJECT_ROOT, '.env');
  if (existsSync(envPath)) {
    unlinkSync(envPath);
    return true;
  }
  return false;
}

function generateLLMConfigTemplate(): string {
  return `
${ chalk.bold.cyan('🤖 LLM Configuration Help') }
${ chalk.gray('━'.repeat(70)) }

${ chalk.yellow('Ask your LLM:') }

\`\`\`
Help me configure eBay API MCP Server:

1. Client ID & Secret from developer.ebay.com/my/keys
2. Environment: sandbox or production
3. Redirect URI (RuName) from eBay Developer Portal
4. Optional: User tokens for higher rate limits

Format these for .env file
\`\`\`

${chalk.gray('━'.repeat(70))}
`;
}

function testConfiguration(config: Record<string, string>): { success: boolean; message: string } {
  try {
    // Validate required fields
    if (!config.EBAY_CLIENT_ID || !config.EBAY_CLIENT_SECRET) {
      return {
        success: false,
        message: 'Missing required credentials (Client ID or Secret)',
      };
    }

    // Validate environment
    if (!['sandbox', 'production'].includes(config.EBAY_ENVIRONMENT)) {
      return {
        success: false,
        message: 'Invalid environment (must be sandbox or production)',
      };
    }

    // Validate token format if provided
    if (config.EBAY_USER_ACCESS_TOKEN && !config.EBAY_USER_ACCESS_TOKEN.startsWith('v^1.1#')) {
      return {
        success: false,
        message: 'Invalid user access token format (should start with v^1.1#)',
      };
    }

    if (config.EBAY_USER_REFRESH_TOKEN && !config.EBAY_USER_REFRESH_TOKEN.startsWith('v^1.1#')) {
      return {
        success: false,
        message: 'Invalid user refresh token format (should start with v^1.1#)',
      };
    }

    // All validations passed
    return {
      success: true,
      message: 'Configuration validated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: `Validation error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Setup Steps
// ═══════════════════════════════════════════════════════════════════════════

async function step1_Welcome(): Promise<boolean> {
  displayWelcome();

  const response = await prompts({
    type: 'confirm',
    name: 'ready',
    message: chalk.bold('Ready to begin?'),
    initial: true,
  });

  return response.ready;
}

async function step2_BasicCredentials(existingConfig: Record<string, string>) {
  displayLogo();
  console.log(chalk.bold.cyan('\n📝 Step 1: Basic eBay API Credentials\n'));
  console.log(chalk.gray('Get these from: https://developer.ebay.com/my/keys\n'));

  const config: Record<string, string> = {};

  // Client ID
  if (existingConfig.EBAY_CLIENT_ID) {
    console.log(chalk.green(`✓ Client ID already configured: ${existingConfig.EBAY_CLIENT_ID.substring(0, 20)}...`));
    const keepClientId = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Keep existing Client ID?',
      initial: true,
    });

    if (keepClientId.value) {
      config.EBAY_CLIENT_ID = existingConfig.EBAY_CLIENT_ID;
    } else {
      const newClientId = await prompts({
        type: 'text',
        name: 'value',
        message: chalk.bold('New eBay Client ID:'),
        validate: validateRequired,
      });
      config.EBAY_CLIENT_ID = newClientId.value;
    }
  } else {
    const clientId = await prompts({
      type: 'text',
      name: 'value',
      message: chalk.bold('eBay Client ID:'),
      validate: validateRequired,
    });
    config.EBAY_CLIENT_ID = clientId.value;
  }

  // Client Secret
  if (existingConfig.EBAY_CLIENT_SECRET) {
    console.log(chalk.green('✓ Client Secret already configured'));
    const keepSecret = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Keep existing Client Secret?',
      initial: true,
    });

    if (keepSecret.value) {
      config.EBAY_CLIENT_SECRET = existingConfig.EBAY_CLIENT_SECRET;
    } else {
      const newSecret = await prompts({
        type: 'password',
        name: 'value',
        message: chalk.bold('New eBay Client Secret:'),
        validate: validateRequired,
      });
      config.EBAY_CLIENT_SECRET = newSecret.value;
    }
  } else {
    const secret = await prompts({
      type: 'password',
      name: 'value',
      message: chalk.bold('eBay Client Secret:'),
      validate: validateRequired,
    });
    config.EBAY_CLIENT_SECRET = secret.value;
  }

  // Environment
  if (existingConfig.EBAY_ENVIRONMENT) {
    console.log(chalk.green(`✓ Environment already set: ${existingConfig.EBAY_ENVIRONMENT}`));
    const keepEnv = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Keep existing environment?',
      initial: true,
    });

    if (keepEnv.value) {
      config.EBAY_ENVIRONMENT = existingConfig.EBAY_ENVIRONMENT;
    } else {
      const newEnv = await prompts({
        type: 'select',
        name: 'value',
        message: chalk.bold('Environment:'),
        choices: [
          { title: chalk.yellow('🧪 Sandbox') + ' (Testing)', value: 'sandbox' },
          { title: chalk.green('🚀 Production') + ' (Live eBay)', value: 'production' },
        ],
      });
      config.EBAY_ENVIRONMENT = newEnv.value;
    }
  } else {
    const env = await prompts({
      type: 'select',
      name: 'value',
      message: chalk.bold('Environment:'),
      choices: [
        { title: chalk.yellow('🧪 Sandbox') + ' (Testing)', value: 'sandbox' },
        { title: chalk.green('🚀 Production') + ' (Live eBay)', value: 'production' },
      ],
    });
    config.EBAY_ENVIRONMENT = env.value;
  }

  // Redirect URI
  if (existingConfig.EBAY_REDIRECT_URI) {
    console.log(chalk.green(`✓ Redirect URI already set: ${existingConfig.EBAY_REDIRECT_URI}`));
    const keepUri = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Keep existing Redirect URI?',
      initial: true,
    });

    if (keepUri.value) {
      config.EBAY_REDIRECT_URI = existingConfig.EBAY_REDIRECT_URI;
    } else {
      const newUri = await prompts({
        type: 'text',
        name: 'value',
        message: chalk.bold('New Redirect URI (RuName):'),
        validate: validateRequired,
      });
      config.EBAY_REDIRECT_URI = newUri.value;
    }
  } else {
    const uri = await prompts({
      type: 'text',
      name: 'value',
      message: chalk.bold('Redirect URI (RuName):'),
      validate: validateRequired,
    });
    config.EBAY_REDIRECT_URI = uri.value;
  }

  return config;
}

async function step3_UserTokens(existingConfig: Record<string, string>) {
  displayLogo();
  console.log(chalk.bold.cyan('\n🔐 Step 2: User OAuth Tokens (Optional)\n'));
  console.log(chalk.gray('These provide higher rate limits (10k-50k requests/day)\n'));

  const config: Record<string, string> = {};

  // Check if user has refresh token (most important)
  if (existingConfig.EBAY_USER_REFRESH_TOKEN) {
    console.log(chalk.green('✓ User Refresh Token already configured'));
    console.log(chalk.gray('  (This token auto-refreshes, no manual setup needed!)\n'));

    const keepTokens = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Keep existing user tokens?',
      initial: true,
    });

    if (keepTokens.value) {
      config.EBAY_USER_REFRESH_TOKEN = existingConfig.EBAY_USER_REFRESH_TOKEN;
      if (existingConfig.EBAY_USER_ACCESS_TOKEN) {
        config.EBAY_USER_ACCESS_TOKEN = existingConfig.EBAY_USER_ACCESS_TOKEN;
      }
      return config;
    }
  }

  const wantsTokens = await prompts({
    type: 'confirm',
    name: 'value',
    message: chalk.bold('Add user OAuth tokens now?'),
    initial: false,
  });

  if (!wantsTokens.value) {
    console.log(chalk.yellow('\n💡 Tip: You can add these later using ebay_get_oauth_url tool\n'));
    console.log(chalk.gray('   No tokens needed if just exploring schemas/endpoints!\n'));
    return {};
  }

  // Access Token (optional)
  const accessToken = await prompts({
    type: 'text',
    name: 'value',
    message: chalk.bold('User Access Token (optional, will auto-refresh):'),
    validate: validateToken,
  });
  if (accessToken.value) {
    config.EBAY_USER_ACCESS_TOKEN = accessToken.value;
  }

  // Refresh Token (important!)
  const refreshToken = await prompts({
    type: 'text',
    name: 'value',
    message: chalk.bold('User Refresh Token (important - keeps you authenticated):'),
    validate: validateToken,
  });
  if (refreshToken.value) {
    config.EBAY_USER_REFRESH_TOKEN = refreshToken.value;
  }

  return config;
}

async function step4_AppToken(existingConfig: Record<string, string>) {
  displayLogo();
  console.log(chalk.bold.cyan('\n🎫 Step 3: App Access Token (Optional)\n'));
  console.log(chalk.gray('Auto-generates on server startup if not provided\n'));

  const config: Record<string, string> = {};

  if (existingConfig.EBAY_APP_ACCESS_TOKEN) {
    console.log(chalk.green('✓ App Access Token already configured'));
    const keepToken = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Keep existing app token?',
      initial: true,
    });

    if (keepToken.value) {
      config.EBAY_APP_ACCESS_TOKEN = existingConfig.EBAY_APP_ACCESS_TOKEN;
      return config;
    }
  }

  const wantsToken = await prompts({
    type: 'confirm',
    name: 'value',
    message: chalk.bold('Provide a pre-generated app token?'),
    initial: false,
  });

  if (!wantsToken.value) {
    console.log(chalk.gray('\n✓ Will auto-generate on server startup\n'));
    return {};
  }

  const token = await prompts({
    type: 'text',
    name: 'value',
    message: chalk.bold('App Access Token:'),
    validate: validateToken,
  });

  if (token.value) {
    config.EBAY_APP_ACCESS_TOKEN = token.value;
  }

  return config;
}

async function step5_Review(config: Record<string, string>) {
  displayLogo();
  console.log(chalk.bold.cyan('\n📋 Step 4: Review Configuration\n'));

  console.log(chalk.bold('Basic Credentials:'));
  console.log(`  ${chalk.gray('Client ID:')} ${chalk.white(config.EBAY_CLIENT_ID?.substring(0, 20) + '...')}`);
  console.log(`  ${chalk.gray('Client Secret:')} ${chalk.white('•'.repeat(20))}`);
  console.log(`  ${chalk.gray('Environment:')} ${config.EBAY_ENVIRONMENT === 'production' ? chalk.green('Production') : chalk.yellow('Sandbox')}`);
  console.log(`  ${chalk.gray('Redirect URI:')} ${chalk.white(config.EBAY_REDIRECT_URI || 'Not set')}`);

  console.log(chalk.bold('\nUser Tokens:'));
  console.log(`  ${chalk.gray('Access Token:')} ${config.EBAY_USER_ACCESS_TOKEN ? chalk.green('✓ Set') : chalk.gray('Not set')}`);
  console.log(`  ${chalk.gray('Refresh Token:')} ${config.EBAY_USER_REFRESH_TOKEN ? chalk.green('✓ Set') : chalk.gray('Not set')}`);

  console.log(chalk.bold('\nApp Token:'));
  console.log(`  ${chalk.gray('Access Token:')} ${config.EBAY_APP_ACCESS_TOKEN ? chalk.green('✓ Set') : chalk.gray('Will auto-generate')}`);

  console.log();

  const confirm = await prompts({
    type: 'confirm',
    name: 'value',
    message: chalk.bold('Save this configuration?'),
    initial: true,
  });

  return confirm.value;
}

async function step6_Finalize(config: Record<string, string>) {
  displayLogo();
  console.log(chalk.bold.cyan('\n💾 Saving Configuration...\n'));

  saveConfig(config);
  console.log(chalk.green('✓ Configuration saved to .env\n'));

  // Detect MCP clients
  const clients = detectMCPClients();

  if (clients.length > 0) {
    console.log(chalk.bold.cyan('🔍 Detected MCP Clients:\n'));
    clients.forEach(client => {
      console.log(`  ${chalk.green('✓')} ${client.charAt(0).toUpperCase() + client.slice(1)}`);
    });

    const runAutoSetup = await prompts({
      type: 'confirm',
      name: 'value',
      message: chalk.bold('Run auto-setup to configure MCP clients?'),
      initial: true,
    });

    if (runAutoSetup.value) {
      console.log(chalk.gray('\nRunning auto-setup...\n'));
      // We'll trigger auto-setup after this script completes
      return true;
    }
  }

  return false;
}

function displaySuccess(runAutoSetup: boolean) {
  displayLogo();
  console.log(chalk.bold.green('\n✨ Setup Complete! ✨\n'));
  console.log(chalk.gray('━'.repeat(70)));

  console.log(chalk.bold.white('\n📋 Next Steps:\n'));

  let stepNum = 1;
  if (runAutoSetup) {
    console.log(chalk.green(`  ${stepNum++}. ✓ MCP clients configured`));
  } else {
    console.log(chalk.cyan(`  ${stepNum++}. Run: ${chalk.bold('npm run auto-setup')}`));
  }

  console.log(chalk.cyan(`  ${stepNum++}. Build: ${chalk.bold('npm run build')}`));
  console.log(chalk.cyan(`  ${stepNum++}. Restart MCP clients`));
  console.log(chalk.cyan(`  ${stepNum++}. Test with: ${chalk.italic('"Get my eBay inventory"')}\n`));

  console.log(chalk.gray('━'.repeat(70)));
  console.log(chalk.bold.white('\n📚 Quick Reference:\n'));
  console.log(chalk.gray('  npm run setup      ') + chalk.white('→ Run this wizard'));
  console.log(chalk.gray('  npm run build      ') + chalk.white('→ Build project'));
  console.log(chalk.gray('  npm run auto-setup ') + chalk.white('→ Configure MCP clients\n'));

  console.log(chalk.yellow('  Resources:'));
  console.log(chalk.gray('    GitHub:  ') + chalk.blue.underline('github.com/YosefHayim/ebay-api-mcp-server'));
  console.log(chalk.gray('    eBay:    ') + chalk.blue.underline('developer.ebay.com'));
  console.log(chalk.gray('    Creator: ') + createClickableLink(chalk.cyan.underline('YosefHayim'), 'https://www.linkedin.com/in/yosef-hayim-sabag/') + '\n');

  console.log(chalk.gray('━'.repeat(70)));
  console.log(chalk.bold.magenta('\n💡 Tips:\n'));
  console.log(chalk.white('  • Use ') + chalk.cyan('ebay_get_oauth_url') + chalk.white(' for user tokens'));
  console.log(chalk.white('  • User tokens = 10x-50x higher rate limits'));
  console.log(chalk.white('  • Test in sandbox first'));
  console.log(chalk.white('  • Never commit .env file\n'));

  console.log(chalk.gray('━'.repeat(70)));
  console.log(chalk.bold.green('\n🎉 Happy Coding! 🚀\n'));
}

// ═══════════════════════════════════════════════════════════════════════════
// Help & CLI
// ═══════════════════════════════════════════════════════════════════════════

function displayHelp() {
  displayLogo();
  console.log(chalk.bold.white('Setup Command Options\n'));
  console.log(chalk.gray('━'.repeat(70)));

  console.log(chalk.bold.cyan('\n📖 Usage:\n'));
  console.log(chalk.white('  npm run setup [options]\n'));

  console.log(chalk.bold.cyan('🎛️  Options:\n'));

  console.log(chalk.yellow('  --help, -h'));
  console.log(chalk.gray('    Show this help\n'));

  console.log(chalk.yellow('  --reset'));
  console.log(chalk.gray('    Backup and reset .env file\n'));

  console.log(chalk.yellow('  --skip-welcome'));
  console.log(chalk.gray('    Skip welcome screen\n'));

  console.log(chalk.yellow('  --no-auto-setup'));
  console.log(chalk.gray('    Skip MCP client setup\n'));

  console.log(chalk.yellow('  --llm-help'));
  console.log(chalk.gray('    Get LLM template\n'));

  console.log(chalk.bold.cyan('💡 Examples:\n'));
  console.log(chalk.gray('  npm run setup'));
  console.log(chalk.gray('  npm run setup --reset'));
  console.log(chalk.gray('  npm run setup --skip-welcome\n'));

  console.log(chalk.gray('━'.repeat(70)));
  console.log(chalk.bold.cyan('\n📚 Resources:\n'));
  console.log(chalk.white('  Docs:    ') + chalk.blue.underline('github.com/YosefHayim/ebay-api-mcp-server'));
  console.log(chalk.white('  eBay:    ') + chalk.blue.underline('developer.ebay.com'));
  console.log(chalk.white('  Creator: ') + createClickableLink(chalk.cyan.underline('YosefHayim'), 'https://www.linkedin.com/in/yosef-hayim-sabag/') + '\n');

  console.log(chalk.gray('━'.repeat(70)));
  console.log(chalk.bold.green('\n🚀 Ready? Run: ') + chalk.cyan.bold('npm run setup\n'));
}

function parseArgs(): {
  help: boolean;
  reset: boolean;
  skipWelcome: boolean;
  noAutoSetup: boolean;
  llmHelp: boolean;
} {
  const args = process.argv.slice(2);

  return {
    help: args.includes('--help') || args.includes('-h'),
    reset: args.includes('--reset'),
    skipWelcome: args.includes('--skip-welcome'),
    noAutoSetup: args.includes('--no-auto-setup'),
    llmHelp: args.includes('--llm-help'),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Flow
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  try {
    // Parse command-line arguments
    const cliArgs = parseArgs();

    // Handle --help flag
    if (cliArgs.help) {
      displayHelp();
      return;
    }

    // Handle --llm-help flag
    if (cliArgs.llmHelp) {
      displayLogo();
      console.log(generateLLMConfigTemplate());
      console.log(chalk.cyan('💡 Copy the template above and share it with your LLM assistant!\n'));
      return;
    }

    // Handle --reset flag
    if (cliArgs.reset) {
      displayLogo();
      console.log(chalk.yellow('\n🔄 Resetting configuration...\n'));
      const backupPath = backupEnvFile();
      if (backupPath) {
        console.log(chalk.green(`✓ Backup created: ${backupPath}`));
      } else {
        console.log(chalk.gray('✓ No existing .env file to backup'));
      }
      resetEnvFile();
      console.log(chalk.yellow('✓ Configuration reset complete\n'));
      console.log(chalk.cyan('Continuing with setup...\n'));
      await new Promise(resolve => {
        setTimeout(resolve, 1500);
      });
    }

    // Load existing configuration
    const existingConfig = loadExistingConfig();
    const hasExisting = Object.keys(existingConfig).length > 0;

    // Step 0: Handle existing configuration (if not already reset via CLI)
    if (hasExisting && !cliArgs.reset) {
      displayLogo();
      console.log(chalk.yellow('\n⚠️  Existing configuration detected\n'));

      const choice = await prompts({
        type: 'select',
        name: 'action',
        message: chalk.bold('What would you like to do?'),
        choices: [
          { title: chalk.green('📝 Modify existing configuration'), value: 'modify' },
          { title: chalk.yellow('🔄 Reset and start fresh (creates backup)'), value: 'reset' },
          { title: chalk.blue('🤖 Get LLM configuration help'), value: 'llm' },
          { title: chalk.gray('❌ Cancel'), value: 'cancel' },
        ],
      });

      if (choice.action === 'cancel') {
        console.log(chalk.gray('\nSetup cancelled. Existing configuration preserved.\n'));
        return;
      }

      if (choice.action === 'llm') {
        displayLogo();
        console.log(generateLLMConfigTemplate());
        console.log(chalk.cyan('\nPress Enter to continue with setup...'));
        await prompts({
          type: 'confirm',
          name: 'continue',
          message: 'Ready to proceed?',
          initial: true,
        });
      }

      if (choice.action === 'reset') {
        const backupPath = backupEnvFile();
        if (backupPath) {
          console.log(chalk.green(`\n✓ Backup created: ${backupPath}`));
        }
        resetEnvFile();
        console.log(chalk.yellow('✓ .env file reset\n'));
      }
    }

    // Step 1: Welcome (skip if --skip-welcome flag)
    if (!cliArgs.skipWelcome) {
      const ready = await step1_Welcome();
      if (!ready) {
        console.log(chalk.gray('\nSetup cancelled.\n'));
        return;
      }
    }

    // Step 2: Basic credentials
    const basicConfig = await step2_BasicCredentials(existingConfig);
    if (!basicConfig.EBAY_CLIENT_ID) {
      console.log(chalk.red('\n❌ Setup cancelled.\n'));
      return;
    }

    // Step 3: User tokens
    const userTokens = await step3_UserTokens(existingConfig);

    // Step 4: App token
    const appToken = await step4_AppToken(existingConfig);

    // Combine all configuration
    const finalConfig = {
      ...basicConfig,
      ...userTokens,
      ...appToken,
    };

    // Step 5: Test configuration
    displayLogo();
    console.log(chalk.bold.cyan('\n🧪 Step 4: Testing Configuration\n'));

    const testResult = testConfiguration(finalConfig);
    if (testResult.success) {
      console.log(chalk.green(`✓ ${testResult.message}\n`));
    } else {
      console.log(chalk.red(`✗ ${testResult.message}\n`));
      const continueAnyway = await prompts({
        type: 'confirm',
        name: 'value',
        message: chalk.yellow('Continue with potentially invalid configuration?'),
        initial: false,
      });

      if (!continueAnyway.value) {
        console.log(chalk.yellow('\n⚠️  Setup cancelled. Please fix the issues and try again.\n'));
        return;
      }
    }

    // Step 6: Review
    const confirmed = await step5_Review(finalConfig);
    if (!confirmed) {
      console.log(chalk.yellow('\n⚠️  Configuration not saved. Setup cancelled.\n'));
      return;
    }

    // Step 7: Finalize
    const runAutoSetup = cliArgs.noAutoSetup ? false : await step6_Finalize(finalConfig);

    // Display success
    displaySuccess(runAutoSetup || cliArgs.noAutoSetup);

    // Trigger auto-setup if requested (and not disabled via flag)
    if (runAutoSetup && !cliArgs.noAutoSetup) {
      console.log(chalk.cyan('\n🔧 Running auto-setup...\n'));
      try {
        execSync('npm run auto-setup', { stdio: 'inherit', cwd: PROJECT_ROOT });
        console.log(chalk.green('\n✓ Auto-setup completed successfully!\n'));
      } catch {
        console.error(chalk.red('\n❌ Auto-setup failed. You can run it manually with: npm run auto-setup\n'));
      }
    } else if (cliArgs.noAutoSetup) {
      console.log(chalk.yellow('\n⏭️  Skipped auto-setup (--no-auto-setup flag)'));
      console.log(chalk.gray('   Run manually later with: npm run auto-setup\n'));
    }

  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'User force closed the prompt') {
      console.log(chalk.gray('\n\nSetup cancelled by user.\n'));
      process.exit(0);
    }

    console.error(chalk.red('\n❌ Setup failed:'), error);
    process.exit(1);
  }
}

// Run the interactive setup
void main();
