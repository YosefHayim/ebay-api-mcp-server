# eBay API MCP Server

Model Context Protocol (MCP) server for eBay Sell APIs. Provides AI assistants with access to eBay's seller functionality including inventory management, order fulfillment, marketing campaigns, and account configuration.

## Features

This MCP server provides access to the following eBay Sell APIs:

- **Account Management**: Configure seller policies, payment/return/fulfillment policies
- **Inventory Management**: Create and manage inventory items and offers
- **Order Management**: Process orders, create shipping fulfillments, issue refunds
- **Marketing**: Manage marketing campaigns and promotions
- **Analytics**: Access sales and traffic reports *(coming soon)*
- **Communication**: Handle buyer messages and negotiations *(coming soon)*

## Prerequisites

- Node.js 18 or higher
- eBay Developer account with API credentials
- Application keys from [eBay Developer Portal](https://developer.ebay.com/my/keys)

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your eBay API credentials:
   ```env
   EBAY_CLIENT_ID=your_client_id_here
   EBAY_CLIENT_SECRET=your_client_secret_here
   EBAY_ENVIRONMENT=sandbox  # or 'production'
   ```

3. Get your credentials from the [eBay Developer Portal](https://developer.ebay.com/my/keys)

## Usage

### Running Standalone

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

### Using with Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ebay": {
      "command": "node",
      "args": ["/absolute/path/to/ebay-api-mcp-server/build/index.js"],
      "env": {
        "EBAY_CLIENT_ID": "your_client_id",
        "EBAY_CLIENT_SECRET": "your_client_secret",
        "EBAY_ENVIRONMENT": "sandbox"
      }
    }
  }
}
```

## Available Tools

### Account Management
- `ebay_get_custom_policies` - Get custom policies
- `ebay_get_fulfillment_policies` - Get fulfillment policies
- `ebay_get_payment_policies` - Get payment policies
- `ebay_get_return_policies` - Get return policies

### Inventory Management
- `ebay_get_inventory_items` - List all inventory items
- `ebay_get_inventory_item` - Get specific inventory item by SKU
- `ebay_create_inventory_item` - Create or update inventory item
- `ebay_get_offers` - List offers
- `ebay_create_offer` - Create a new offer
- `ebay_publish_offer` - Publish offer to create listing

### Order Management
- `ebay_get_orders` - Get orders with optional filters
- `ebay_get_order` - Get specific order details
- `ebay_create_shipping_fulfillment` - Create shipping fulfillment

### Marketing
- `ebay_get_campaigns` - Get marketing campaigns
- `ebay_get_promotions` - Get promotions

## Development

```bash
# Type check
npm run typecheck

# Watch mode for development
npm run watch

# Clean build artifacts
npm run clean
```

## Project Structure

```
src/
├── api/                    # eBay API client implementations
│   ├── account-management/ # Account API handlers
│   ├── listing-management/ # Inventory API handlers
│   ├── order-management/   # Fulfillment API handlers
│   ├── marketing-and-promotions/ # Marketing API handlers
│   └── client.ts          # Base HTTP client
├── auth/                  # OAuth authentication
│   └── oauth.ts          # eBay OAuth 2.0 client
├── config/               # Configuration management
│   └── environment.ts    # Environment variable handling
├── tools/                # MCP tool definitions
│   └── index.ts         # Tool schemas and execution
├── types/                # TypeScript type definitions
│   └── ebay.ts          # eBay API types
└── index.ts             # MCP server entrypoint
```

## Authentication

The server uses eBay's OAuth 2.0 Client Credentials flow for authentication. Access tokens are automatically managed and refreshed as needed.

## Error Handling

The server provides detailed error messages for:
- Authentication failures
- API request errors
- Invalid parameters
- Network issues

## License

MIT

## Resources

- [eBay Developer Program](https://developer.ebay.com/)
- [eBay API Documentation](https://developer.ebay.com/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)
