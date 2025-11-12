#!/bin/bash

###############################################################################
# eBay MCP Setup Configuration Generator
#
# This script creates a centralized mcp-setup.json configuration file that
# contains all your eBay credentials and MCP client settings in one place.
#
# Usage:
#   ./scripts/create-mcp-setup.sh
#
# The generated file will be created at:
#   mcp-setup.json (in project root)
#
# After running this script:
#   1. Edit mcp-setup.json with your actual credentials
#   2. Run ./scripts/setup-mcp-clients.sh to auto-configure all MCP clients
#   3. Optionally use ebay_set_user_tokens_with_expiry tool for token management
#
# Benefits:
#   - Single source of truth for all eBay credentials
#   - Auto-generates MCP client configs for Claude, Cline, Continue, Zed
#   - Supports both manual token file and MCP client configuration workflows
#   - Automatic token refresh when access token expires
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
TEMPLATE_FILE="$PROJECT_ROOT/mcp-setup.json.template"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}    eBay MCP Server - Centralized Setup Generator${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Check if setup file already exists
if [ -f "$SETUP_FILE" ]; then
    echo -e "${YELLOW}⚠ Warning: Setup configuration file already exists!${NC}"
    echo -e "   Location: ${SETUP_FILE}"
    echo ""
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}ℹ Cancelled. Existing setup file preserved.${NC}"
        exit 0
    fi
    echo ""
fi

# Create setup configuration from template
echo -e "${BLUE}📝 Creating centralized setup configuration...${NC}"
echo ""

if [ ! -f "$TEMPLATE_FILE" ]; then
    echo -e "${RED}❌ Error: Template file not found at ${TEMPLATE_FILE}${NC}"
    exit 1
fi

# Copy template to setup file
cp "$TEMPLATE_FILE" "$SETUP_FILE"

# Get absolute build path
BUILD_PATH="$PROJECT_ROOT/build/index.js"

# Update buildPath in the setup file with actual project path
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|/absolute/path/to/ebay-api-mcp-server/build/index.js|$BUILD_PATH|g" "$SETUP_FILE"
else
    # Linux
    sed -i "s|/absolute/path/to/ebay-api-mcp-server/build/index.js|$BUILD_PATH|g" "$SETUP_FILE"
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Setup configuration created successfully!${NC}"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}📁 File Location:${NC}"
    echo -e "   ${SETUP_FILE}"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}📝 Next Steps:${NC}"
    echo ""
    echo -e "   ${CYAN}Step 1: Edit Configuration${NC}"
    echo -e "   ──────────────────────────"
    echo -e "   Edit ${BLUE}mcp-setup.json${NC} and fill in your values:"
    echo ""
    echo -e "   ${MAGENTA}Required:${NC}"
    echo -e "   • ebay.credentials.clientId"
    echo -e "   • ebay.credentials.clientSecret"
    echo -e "   • ebay.credentials.environment (sandbox/production)"
    echo ""
    echo -e "   ${MAGENTA}Optional (for user tokens):${NC}"
    echo -e "   • ebay.tokens.accessToken"
    echo -e "   • ebay.tokens.refreshToken"
    echo ""
    echo -e "   ${MAGENTA}MCP Clients:${NC}"
    echo -e "   • Enable/disable clients in mcpServer.clients"
    echo -e "   • Adjust config paths if needed"
    echo ""
    echo -e "   ${CYAN}Step 2: Auto-Generate MCP Client Configs${NC}"
    echo -e "   ───────────────────────────────────────"
    echo -e "   Run the setup script to auto-configure all enabled MCP clients:"
    echo ""
    echo -e "   ${GREEN}./scripts/setup-mcp-clients.sh${NC}"
    echo ""
    echo -e "   This will automatically:"
    echo -e "   • Read your mcp-setup.json configuration"
    echo -e "   • Generate MCP client configs for enabled clients"
    echo -e "   • Create .ebay-mcp-tokens.json with your tokens (if provided)"
    echo -e "   • Backup existing configs before modifying"
    echo ""
    echo -e "   ${CYAN}Step 3: Token Management (Optional)${NC}"
    echo -e "   ─────────────────────────────────────"
    echo -e "   Use MCP tools for advanced token management:"
    echo ""
    echo -e "   ${MAGENTA}ebay_set_user_tokens_with_expiry${NC} - Set tokens with custom expiry"
    echo -e "   ${MAGENTA}ebay_get_token_status${NC} - Check current token status"
    echo -e "   ${MAGENTA}ebay_validate_token_expiry${NC} - Validate token expiration"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}⚠️  Security Reminders:${NC}"
    echo -e "   • ${RED}NEVER commit mcp-setup.json to version control!${NC}"
    echo -e "   • Already protected in .gitignore"
    echo -e "   • Recommended file permissions: ${CYAN}chmod 600 mcp-setup.json${NC}"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}📚 Documentation:${NC}"
    echo -e "   • README.md - Quick start guide"
    echo -e "   • docs/auth/README.md - Detailed OAuth setup"
    echo -e "   • OAUTH-SETUP.md - Step-by-step OAuth guide"
    echo -e "   • scripts/README.md - Scripts documentation"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
else
    echo -e "${RED}❌ Error: Failed to create setup configuration file${NC}"
    exit 1
fi
