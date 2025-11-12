#!/bin/bash

###############################################################################
# eBay MCP Client Auto-Configuration Script
#
# This script reads the centralized mcp-setup.json configuration file and
# automatically generates MCP client configurations for:
#   - Claude Desktop (macOS/Windows/Linux)
#   - Cline (VS Code extension)
#   - Continue (VS Code extension)
#   - Zed (text editor)
#
# Usage:
#   ./scripts/setup-mcp-clients.sh
#
# Prerequisites:
#   1. Run ./scripts/create-mcp-setup.sh to generate mcp-setup.json
#   2. Edit mcp-setup.json with your eBay credentials
#   3. Enable/disable clients in mcp-setup.json as needed
#
# What it does:
#   - Reads configuration from mcp-setup.json
#   - Creates .ebay-mcp-tokens.json if tokens are provided
#   - Generates MCP client configs for enabled clients
#   - Backs up existing configs before modifying
#   - Validates all paths and configurations
#
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SETUP_FILE="$PROJECT_ROOT/mcp-setup.json"
TOKEN_FILE="$PROJECT_ROOT/.ebay-mcp-tokens.json"

# Helper functions
print_header() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}    $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if jq is installed
check_jq() {
    if ! command -v jq &> /dev/null; then
        print_error "jq is required but not installed"
        echo ""
        echo "Install jq:"
        echo "  macOS:  brew install jq"
        echo "  Linux:  sudo apt-get install jq"
        echo "  or visit: https://stedolan.github.io/jq/"
        exit 1
    fi
}

# Check if mcp-setup.json exists
check_setup_file() {
    if [ ! -f "$SETUP_FILE" ]; then
        print_error "Setup configuration file not found!"
        echo ""
        print_info "Run this command first to create the configuration:"
        echo -e "  ${CYAN}./scripts/create-mcp-setup.sh${NC}"
        echo ""
        exit 1
    fi
}

# Validate JSON file
validate_json() {
    local file=$1
    if ! jq empty "$file" 2>/dev/null; then
        print_error "Invalid JSON in $file"
        exit 1
    fi
}

# Expand tilde in path
expand_path() {
    local path=$1
    # Expand ~ to home directory
    path="${path/#\~/$HOME}"
    echo "$path"
}

# Create backup of existing config file
backup_config() {
    local config_file=$1
    if [ -f "$config_file" ]; then
        local backup_file="${config_file}.backup.$(date +%Y%m%d_%H%M%S)"
        cp "$config_file" "$backup_file"
        print_info "Backed up existing config to: $backup_file"
    fi
}

# Read configuration from mcp-setup.json
read_config() {
    print_header "Reading Configuration"

    validate_json "$SETUP_FILE"

    # Read eBay credentials
    EBAY_CLIENT_ID=$(jq -r '.ebay.credentials.clientId' "$SETUP_FILE")
    EBAY_CLIENT_SECRET=$(jq -r '.ebay.credentials.clientSecret' "$SETUP_FILE")
    EBAY_ENVIRONMENT=$(jq -r '.ebay.credentials.environment' "$SETUP_FILE")
    EBAY_REDIRECT_URI=$(jq -r '.ebay.credentials.redirectUri' "$SETUP_FILE")

    # Read optional tokens
    ACCESS_TOKEN=$(jq -r '.ebay.tokens.accessToken // empty' "$SETUP_FILE")
    REFRESH_TOKEN=$(jq -r '.ebay.tokens.refreshToken // empty' "$SETUP_FILE")
    CLIENT_TOKEN=$(jq -r '.ebay.tokens.clientToken // empty' "$SETUP_FILE")
    CLIENT_REFRESH_TOKEN=$(jq -r '.ebay.tokens.clientRefreshToken // empty' "$SETUP_FILE")

    # Read MCP server settings
    BUILD_PATH=$(jq -r '.mcpServer.buildPath' "$SETUP_FILE")
    AUTO_GENERATE=$(jq -r '.mcpServer.autoGenerateConfigs' "$SETUP_FILE")

    # Validate required fields
    if [ "$EBAY_CLIENT_ID" = "null" ] || [ "$EBAY_CLIENT_ID" = "YOUR_EBAY_CLIENT_ID" ]; then
        print_error "EBAY_CLIENT_ID not configured in mcp-setup.json"
        exit 1
    fi

    if [ "$EBAY_CLIENT_SECRET" = "null" ] || [ "$EBAY_CLIENT_SECRET" = "YOUR_EBAY_CLIENT_SECRET" ]; then
        print_error "EBAY_CLIENT_SECRET not configured in mcp-setup.json"
        exit 1
    fi

    if [ ! -f "$BUILD_PATH" ]; then
        print_error "Build file not found: $BUILD_PATH"
        print_info "Run 'npm run build' first"
        exit 1
    fi

    print_success "Configuration loaded successfully"
    print_info "Environment: $EBAY_ENVIRONMENT"
    print_info "Build path: $BUILD_PATH"
}

# Create .ebay-mcp-tokens.json if tokens are provided
create_token_file() {
    if [ -n "$ACCESS_TOKEN" ] && [ "$ACCESS_TOKEN" != "YOUR_USER_ACCESS_TOKEN_OPTIONAL" ] && [ "$ACCESS_TOKEN" != "null" ]; then
        print_header "Creating Token File"

        # Backup existing token file
        if [ -f "$TOKEN_FILE" ]; then
            backup_config "$TOKEN_FILE"
        fi

        # Calculate expiry times (access: 2 hours, refresh: 18 months)
        local now=$(date +%s)
        local access_expiry=$((now * 1000 + 7200000))  # 2 hours in milliseconds
        local refresh_expiry=$((now * 1000 + 47304000000))  # 18 months in milliseconds

        # Create token file
        cat > "$TOKEN_FILE" <<EOF
{
  "accessToken": "$ACCESS_TOKEN",
  "refreshToken": "$REFRESH_TOKEN",
  "tokenType": "Bearer",
  "accessTokenExpiry": $access_expiry,
  "refreshTokenExpiry": $refresh_expiry,
  "scope": "https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/sell.stores https://api.ebay.com/oauth/api_scope/sell.stores.readonly"
}
EOF

        print_success "Token file created: $TOKEN_FILE"
        print_warning "Note: Token expiry times are estimates. Use ebay_set_user_tokens_with_expiry for accurate times."
    else
        print_info "No user tokens provided in mcp-setup.json (skipping token file creation)"
    fi
}

# Build MCP server configuration JSON
build_server_config() {
    local env_json=""

    # Build env object
    env_json=$(jq -n \
        --arg clientId "$EBAY_CLIENT_ID" \
        --arg clientSecret "$EBAY_CLIENT_SECRET" \
        --arg environment "$EBAY_ENVIRONMENT" \
        '{
            EBAY_CLIENT_ID: $clientId,
            EBAY_CLIENT_SECRET: $clientSecret,
            EBAY_ENVIRONMENT: $environment
        }')

    # Add optional redirect URI
    if [ -n "$EBAY_REDIRECT_URI" ] && [ "$EBAY_REDIRECT_URI" != "null" ] && [ "$EBAY_REDIRECT_URI" != "https://your-app.com/callback" ]; then
        env_json=$(echo "$env_json" | jq --arg uri "$EBAY_REDIRECT_URI" '. + {EBAY_REDIRECT_URI: $uri}')
    fi

    # Build complete server config
    jq -n \
        --arg buildPath "$BUILD_PATH" \
        --argjson env "$env_json" \
        '{
            command: "node",
            args: [$buildPath],
            env: $env
        }'
}

# Configure Claude Desktop
configure_claude() {
    local enabled=$(jq -r '.mcpServer.clients.claude.enabled' "$SETUP_FILE")

    if [ "$enabled" != "true" ]; then
        print_info "Claude Desktop: Disabled in configuration (skipping)"
        return 0
    fi

    print_header "Configuring Claude Desktop"

    local config_path=$(jq -r '.mcpServer.clients.claude.configPath' "$SETUP_FILE")
    config_path=$(expand_path "$config_path")

    local config_dir=$(dirname "$config_path")

    # Create config directory if it doesn't exist
    if [ ! -d "$config_dir" ]; then
        print_warning "Claude Desktop config directory not found: $config_dir"
        read -p "Create directory? (y/N): " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Skipping Claude Desktop configuration"
            return 1
        fi
        mkdir -p "$config_dir"
        print_success "Created directory: $config_dir"
    fi

    # Create or update config file
    if [ ! -f "$config_path" ]; then
        echo '{"mcpServers":{}}' > "$config_path"
    else
        backup_config "$config_path"
    fi

    # Build server config
    local server_config=$(build_server_config)

    # Update config file
    local temp_file=$(mktemp)
    jq --argjson server "$server_config" '.mcpServers.ebay = $server' "$config_path" > "$temp_file"
    mv "$temp_file" "$config_path"

    print_success "Claude Desktop configured successfully"
    print_info "Config file: $config_path"
    print_warning "Restart Claude Desktop to apply changes"

    return 0
}

# Configure Cline
configure_cline() {
    local enabled=$(jq -r '.mcpServer.clients.cline.enabled' "$SETUP_FILE")

    if [ "$enabled" != "true" ]; then
        print_info "Cline: Disabled in configuration (skipping)"
        return 0
    fi

    print_header "Configuring Cline"

    local config_path=$(jq -r '.mcpServer.clients.cline.configPath' "$SETUP_FILE")
    config_path=$(expand_path "$config_path")

    local config_dir=$(dirname "$config_path")

    # Create config directory if it doesn't exist
    if [ ! -d "$config_dir" ]; then
        mkdir -p "$config_dir"
        print_success "Created directory: $config_dir"
    fi

    # Create or update config file
    if [ ! -f "$config_path" ]; then
        echo '{"mcpServers":{}}' > "$config_path"
    else
        backup_config "$config_path"
    fi

    # Build server config
    local server_config=$(build_server_config)

    # Update config file
    local temp_file=$(mktemp)
    jq --argjson server "$server_config" '.mcpServers.ebay = $server' "$config_path" > "$temp_file"
    mv "$temp_file" "$config_path"

    print_success "Cline configured successfully"
    print_info "Config file: $config_path"
    print_warning "Restart VS Code to apply changes"

    return 0
}

# Configure Continue
configure_continue() {
    local enabled=$(jq -r '.mcpServer.clients.continue.enabled' "$SETUP_FILE")

    if [ "$enabled" != "true" ]; then
        print_info "Continue: Disabled in configuration (skipping)"
        return 0
    fi

    print_header "Configuring Continue"

    local config_path=$(jq -r '.mcpServer.clients.continue.configPath' "$SETUP_FILE")
    config_path=$(expand_path "$config_path")

    local config_dir=$(dirname "$config_path")

    # Create config directory if it doesn't exist
    if [ ! -d "$config_dir" ]; then
        mkdir -p "$config_dir"
        print_success "Created directory: $config_dir"
    fi

    # Create or update config file
    if [ ! -f "$config_path" ]; then
        echo '{"mcpServers":{}}' > "$config_path"
    else
        backup_config "$config_path"
    fi

    # Build server config
    local server_config=$(build_server_config)

    # Update config file
    local temp_file=$(mktemp)
    jq --argjson server "$server_config" '.mcpServers.ebay = $server' "$config_path" > "$temp_file"
    mv "$temp_file" "$config_path"

    print_success "Continue configured successfully"
    print_info "Config file: $config_path"
    print_warning "Restart VS Code to apply changes"

    return 0
}

# Configure Zed
configure_zed() {
    local enabled=$(jq -r '.mcpServer.clients.zed.enabled' "$SETUP_FILE")

    if [ "$enabled" != "true" ]; then
        print_info "Zed: Disabled in configuration (skipping)"
        return 0
    fi

    print_header "Configuring Zed"

    local config_path=$(jq -r '.mcpServer.clients.zed.configPath' "$SETUP_FILE")
    config_path=$(expand_path "$config_path")

    local config_dir=$(dirname "$config_path")

    # Create config directory if it doesn't exist
    if [ ! -d "$config_dir" ]; then
        mkdir -p "$config_dir"
        print_success "Created directory: $config_dir"
    fi

    # Zed uses different config structure (context_servers instead of mcpServers)
    if [ ! -f "$config_path" ]; then
        echo '{"context_servers":{}}' > "$config_path"
    else
        backup_config "$config_path"
    fi

    # Build server config (Zed format)
    local server_config=$(jq -n \
        --arg buildPath "$BUILD_PATH" \
        --arg clientId "$EBAY_CLIENT_ID" \
        --arg clientSecret "$EBAY_CLIENT_SECRET" \
        --arg environment "$EBAY_ENVIRONMENT" \
        '{
            command: {
                path: "node",
                args: [$buildPath],
                env: {
                    EBAY_CLIENT_ID: $clientId,
                    EBAY_CLIENT_SECRET: $clientSecret,
                    EBAY_ENVIRONMENT: $environment
                }
            }
        }')

    # Add optional redirect URI
    if [ -n "$EBAY_REDIRECT_URI" ] && [ "$EBAY_REDIRECT_URI" != "null" ] && [ "$EBAY_REDIRECT_URI" != "https://your-app.com/callback" ]; then
        server_config=$(echo "$server_config" | jq --arg uri "$EBAY_REDIRECT_URI" '.command.env.EBAY_REDIRECT_URI = $uri')
    fi

    # Update config file
    local temp_file=$(mktemp)
    jq --argjson server "$server_config" '.context_servers.ebay = $server' "$config_path" > "$temp_file"
    mv "$temp_file" "$config_path"

    print_success "Zed configured successfully"
    print_info "Config file: $config_path"
    print_warning "Restart Zed to apply changes"

    return 0
}

# Main execution
main() {
    print_header "eBay API MCP Server - Automated Setup"

    # Check prerequisites
    check_jq
    check_setup_file

    # Read configuration
    read_config

    # Create token file if tokens provided
    create_token_file

    echo ""
    print_info "Configuring enabled MCP clients..."
    echo ""

    # Configure each enabled client
    CONFIGURED_COUNT=0

    if configure_claude; then
        ((CONFIGURED_COUNT++))
    fi
    echo ""

    if configure_cline; then
        ((CONFIGURED_COUNT++))
    fi
    echo ""

    if configure_continue; then
        ((CONFIGURED_COUNT++))
    fi
    echo ""

    if configure_zed; then
        ((CONFIGURED_COUNT++))
    fi

    # Summary
    print_header "Setup Complete"

    if [ $CONFIGURED_COUNT -eq 0 ]; then
        print_warning "No clients were configured"
        print_info "Enable clients in mcp-setup.json and run this script again"
    else
        print_success "Successfully configured $CONFIGURED_COUNT client(s)"
    fi

    echo ""
    print_info "Next steps:"
    echo "  1. Restart your configured AI client(s)"
    echo "  2. Verify the eBay MCP server appears in available tools"
    echo "  3. Use 'ebay_get_token_status' to check authentication"
    echo ""

    if [ -f "$TOKEN_FILE" ]; then
        print_info "Token management:"
        echo "  • Tokens loaded from: $TOKEN_FILE"
        echo "  • Use 'ebay_set_user_tokens_with_expiry' for accurate expiry times"
        echo "  • Use 'ebay_validate_token_expiry' to check token status"
        echo ""
    else
        print_info "User token setup:"
        echo "  1. Use 'ebay_get_oauth_url' to generate authorization URL"
        echo "  2. Authorize and get tokens"
        echo "  3. Use 'ebay_set_user_tokens_with_expiry' to save tokens"
        echo ""
    fi

    print_info "Documentation:"
    echo "  • README.md - Quick start guide"
    echo "  • OAUTH-SETUP.md - Step-by-step OAuth guide"
    echo "  • docs/auth/README.md - Detailed authentication guide"
    echo ""
}

# Run main function
main
