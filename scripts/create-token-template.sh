#!/bin/bash

###############################################################################
# eBay MCP Token Template Generator
#
# This script creates a .ebay-mcp-tokens.json template file in the project root
# with placeholder values that you can fill in with your actual OAuth tokens.
#
# Usage:
#   ./scripts/create-token-template.sh
#
# The generated file will be created at:
#   .ebay-mcp-tokens.json (in project root)
#
# After running this script:
#   1. Edit .ebay-mcp-tokens.json
#   2. Replace placeholder values with your actual tokens
#   3. The MCP server will automatically load tokens on startup
#
# Alternative: You can also configure tokens directly in your MCP client config
# (e.g., claude_desktop_config.json) - see README.md for examples.
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TOKEN_FILE="$PROJECT_ROOT/.ebay-mcp-tokens.json"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}    eBay MCP Server - Token Template Generator${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Check if token file already exists
if [ -f "$TOKEN_FILE" ]; then
    echo -e "${YELLOW}⚠ Warning: Token file already exists!${NC}"
    echo -e "   Location: ${TOKEN_FILE}"
    echo ""
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}ℹ Cancelled. Existing token file preserved.${NC}"
        exit 0
    fi
    echo ""
fi

# Create token template
echo -e "${BLUE}📝 Creating token template file...${NC}"
echo ""

cat > "$TOKEN_FILE" << 'EOF'
{
  "accessToken": "YOUR_USER_ACCESS_TOKEN",
  "refreshToken": "YOUR_USER_REFRESH_TOKEN",
  "tokenType": "Bearer",
  "accessTokenExpiry": 1767225600000,
  "refreshTokenExpiry": 1825363200000,
  "scope": "https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/sell.stores https://api.ebay.com/oauth/api_scope/sell.stores.readonly"
}
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Token template created successfully!${NC}"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}📁 File Location:${NC}"
    echo -e "   ${TOKEN_FILE}"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}📝 Next Steps:${NC}"
    echo ""
    echo -e "   ${YELLOW}Option 1: Manual Token Configuration${NC}"
    echo -e "   ────────────────────────────────────"
    echo -e "   1. Edit ${BLUE}.ebay-mcp-tokens.json${NC}"
    echo -e "   2. Replace placeholder values with your actual tokens"
    echo -e "   3. The server will automatically load tokens on startup"
    echo ""
    echo -e "   ${YELLOW}Option 2: MCP Client Configuration (Faster)${NC}"
    echo -e "   ─────────────────────────────────────────────"
    echo -e "   Add tokens directly to your MCP client config:"
    echo ""
    echo -e "   ${BLUE}For Claude Desktop (claude_desktop_config.json):${NC}"
    echo -e '   {'
    echo -e '     "mcpServers": {'
    echo -e '       "ebay": {'
    echo -e '         "command": "node",'
    echo -e '         "args": ["/path/to/build/index.js"],'
    echo -e '         "env": {'
    echo -e '           "EBAY_CLIENT_ID": "your_client_id",'
    echo -e '           "EBAY_CLIENT_SECRET": "your_secret",'
    echo -e '           "EBAY_ENVIRONMENT": "sandbox"'
    echo -e '         }'
    echo -e '       }'
    echo -e '     }'
    echo -e '   }'
    echo ""
    echo -e "   ${GREEN}Then use the ebay_set_user_tokens tool to configure tokens.${NC}"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}📚 Documentation:${NC}"
    echo -e "   • README.md - Quick start guide"
    echo -e "   • docs/auth/README.md - Detailed OAuth setup"
    echo -e "   • OAUTH-SETUP.md - Step-by-step OAuth guide"
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
else
    echo -e "${RED}❌ Error: Failed to create token template file${NC}"
    exit 1
fi
