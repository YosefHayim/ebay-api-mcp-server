# eBay MCP Tools Reference

This directory contains **137 MCP (Model Context Protocol) tools** that expose eBay's Sell APIs to AI assistants like Claude, ChatGPT, and Gemini.

## Overview

- **Total Tools**: 137
- **API Coverage**: 15+ eBay Sell APIs
- **Input Validation**: Zod schemas with runtime type safety
- **Authentication**: OAuth 2.0 with automatic token refresh

## Directory Structure

```
src/tools/
├── README.md              # This file - comprehensive tool documentation
├── tool-definitions.ts    # 137 MCP tool definitions with schemas
├── index.ts              # Tool execution dispatcher
└── schemas.ts            # Zod validation schemas for all tools
```

## Tool Categories

| Category | Tools | Description |
|----------|-------|-------------|
| **OAuth & Authentication** | 6 | Token management, OAuth flow, authentication status |
| **Account Management** | 8 | KYC, programs, subscriptions, user info |
| **Inventory Management** | 15 | Items, locations, SKUs, bulk operations |
| **Offers & Listings** | 13 | Create/update offers, publish, fees, migration |
| **Order Management** | 14 | Fulfillment, shipping, refunds, quotes |
| **Marketing & Promotions** | 8 | Campaigns, promotions, recommendations |
| **Analytics & Reports** | 6 | Traffic reports, seller standards, metrics |
| **Communication** | 7 | Messages, feedback, buyer interactions |
| **Metadata & Policies** | 33 | Category policies, compatibility, taxes, regulations |
| **Compliance & Legal** | 3 | Violations, infringement, suppression |
| **Utilities** | 24 | Translations, recommendations, aspects, labels |

## Tool Catalog

### OAuth & Authentication (6 tools)

Tools for managing OAuth tokens and authentication flow.

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `ebay_get_oauth_url` | Generate OAuth authorization URL for user consent | `redirectUri`, `scopes`, `state` |
| `ebay_set_user_tokens` | Set user access and refresh tokens | `accessToken`, `refreshToken` |
| `ebay_set_user_tokens_with_expiry` | Set tokens with custom expiry times | `accessToken`, `refreshToken`, `accessTokenExpiry`, `refreshTokenExpiry` |
| `ebay_get_token_status` | Check current token status and authentication method | None |
| `ebay_validate_token_expiry` | Validate if tokens are expired | None |
| `ebay_clear_tokens` | Clear all stored OAuth tokens | None |

**Use Cases**:
- Initial OAuth setup for user authentication
- Token refresh and validation
- Switching between user tokens and client credentials

---

### Account Management (8 tools)

Tools for managing seller account settings and programs.

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `ebay_get_user` | Get authenticated user information | None |
| `ebay_get_kyc` | Get KYC (Know Your Customer) verification status | None |
| `ebay_get_subscription` | Get subscription details | `subscriptionId` |
| `ebay_get_opted_in_programs` | List programs the seller is opted into | None |
| `ebay_opt_in_to_program` | Opt into a seller program | `programType` |
| `ebay_opt_out_of_program` | Opt out of a seller program | `programType` |
| `ebay_get_payments_program_status` | Get payments program onboarding status | `marketplaceId` |
| `ebay_opt_in_to_payments_program` | Opt into managed payments program | `marketplaceId` |

**Use Cases**:
- Account verification and compliance
- Program enrollment (eBay Managed Payments, etc.)
- Subscription management

---

### Inventory Management (15 tools)

Tools for managing inventory items, locations, and stock.

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `ebay_create_inventory_item` | Create a new inventory item | `sku`, `product`, `condition`, `availability` |
| `ebay_get_inventory_item` | Retrieve an inventory item by SKU | `sku` |
| `ebay_get_inventory_items` | Get all inventory items with pagination | `limit`, `offset` |
| `ebay_bulk_create_or_replace_inventory_item` | Bulk create/update inventory items | `requests` (array) |
| `ebay_bulk_get_inventory_item` | Bulk retrieve inventory items | `skus` (array) |
| `ebay_create_or_replace_inventory_item_group` | Create/update item group (variations) | `inventoryItemGroupKey`, `variantSKUs` |
| `ebay_get_inventory_item_group` | Get item group details | `inventoryItemGroupKey` |
| `ebay_delete_inventory_item_group` | Delete an item group | `inventoryItemGroupKey` |
| `ebay_create_or_replace_inventory_location` | Create/update inventory location | `merchantLocationKey`, `location` |
| `ebay_get_inventory_location` | Get inventory location details | `merchantLocationKey` |
| `ebay_get_inventory_locations` | List all inventory locations | `limit`, `offset` |
| `ebay_delete_inventory_location` | Delete an inventory location | `merchantLocationKey` |
| `ebay_disable_inventory_location` | Disable an inventory location | `merchantLocationKey` |
| `ebay_enable_inventory_location` | Enable an inventory location | `merchantLocationKey` |
| `ebay_update_location_details` | Update location details | `merchantLocationKey`, `locationInstructions` |

**Use Cases**:
- Managing product catalog and inventory
- Multi-location inventory tracking
- Variation listings (size, color, etc.)
- Bulk inventory operations

---

### Offers & Listings (13 tools)

Tools for creating, publishing, and managing eBay offers.

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `ebay_create_offer` | Create a new offer from inventory item | `sku`, `marketplaceId`, `format`, `listingPolicies` |
| `ebay_get_offer` | Retrieve offer details | `offerId` |
| `ebay_get_offers` | List all offers with filters | `sku`, `marketplaceId`, `format`, `limit` |
| `ebay_update_offer` | Update an existing offer | `offerId`, `pricingSummary`, `listingPolicies` |
| `ebay_delete_offer` | Delete an offer | `offerId` |
| `ebay_publish_offer` | Publish offer to create eBay listing | `offerId` |
| `ebay_withdraw_offer` | Withdraw a published offer (end listing) | `offerId` |
| `ebay_bulk_create_offer` | Bulk create multiple offers | `requests` (array) |
| `ebay_bulk_publish_offer` | Bulk publish multiple offers | `requests` (array) |
| `ebay_bulk_update_price_quantity` | Bulk update prices and quantities | `requests` (array) |
| `ebay_get_listing_fees` | Calculate listing fees before publishing | `offers` (array) |
| `ebay_bulk_migrate_listing` | Migrate legacy listings to inventory model | `requests` (array) |
| `ebay_send_offer_to_interested_buyers` | Send custom offers to buyers | `offerToBuyers` |

**Use Cases**:
- Creating and publishing eBay listings
- Price and inventory updates
- Fee calculation before listing
- Custom buyer offers
- Legacy listing migration

---

### Order Management (14 tools)

Tools for fulfilling orders, creating shipments, and processing refunds.

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `ebay_get_order` | Get order details | `orderId` |
| `ebay_get_orders` | List orders with filters | `orderIds`, `filter`, `limit` |
| `ebay_create_shipping_fulfillment` | Create shipment for order | `orderId`, `lineItems`, `shippedDate`, `trackingNumber` |
| `ebay_issue_refund` | Issue refund to buyer | `orderId`, `lineItems`, `refundAmount` |
| `ebay_create_shipping_quote` | Create shipping quote for international | `orders` (array) |
| `ebay_get_shipping_quote` | Get existing shipping quote | `shippingQuoteId` |
| `ebay_create_fulfillment_policy` | Create fulfillment policy | `name`, `shippingOptions`, `handlingTime` |
| `ebay_get_fulfillment_policy` | Get fulfillment policy | `fulfillmentPolicyId` |
| `ebay_get_fulfillment_policies` | List all fulfillment policies | `marketplaceId` |
| `ebay_get_fulfillment_policy_by_name` | Find policy by name | `name`, `marketplaceId` |
| `ebay_update_fulfillment_policy` | Update fulfillment policy | `fulfillmentPolicyId`, `shippingOptions` |
| `ebay_delete_fulfillment_policy` | Delete fulfillment policy | `fulfillmentPolicyId` |
| `ebay_create_return_policy` | Create return policy | `name`, `returnPeriod`, `refundMethod` |
| `ebay_create_payment_policy` | Create payment policy | `name`, `paymentMethods` |

**Use Cases**:
- Order fulfillment and tracking
- Refund processing
- Shipping policy management
- International shipping quotes
- Business policy creation

---

### Marketing & Promotions (8 tools)

Tools for managing ad campaigns and promotions.

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `ebay_get_campaign` | Get campaign details | `campaignId` |
| `ebay_get_campaigns` | List all ad campaigns | `campaignStatus`, `limit` |
| `ebay_clone_campaign` | Clone existing campaign | `campaignId`, `campaignName` |
| `ebay_pause_campaign` | Pause a running campaign | `campaignId` |
| `ebay_resume_campaign` | Resume a paused campaign | `campaignId` |
| `ebay_end_campaign` | End a campaign permanently | `campaignId` |
| `ebay_update_campaign_identification` | Update campaign name/dates | `campaignId`, `campaignName`, `endDate` |
| `ebay_get_promotions` | List seller promotions | `marketplaceId`, `promotionStatus` |

**Use Cases**:
- Promoted Listings campaign management
- Campaign cloning and scheduling
- Promotion tracking

---

### Analytics & Reports (6 tools)

Tools for accessing seller performance metrics and reports.

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `ebay_get_traffic_report` | Get listing traffic and conversion data | `dimensions`, `filter`, `metrics` |
| `ebay_get_customer_service_metric` | Get customer service performance metrics | `evaluationType`, `customerServiceMetricType` |
| `ebay_find_seller_standards_profiles` | Find seller standards evaluation profiles | None |
| `ebay_get_seller_standards_profile` | Get specific seller standards profile | `program`, `cycle` |
| `ebay_get_offers_to_buyers` | Get offers sent to buyers | `limit`, `offset` |
| `ebay_find_listing_recommendations` | Get listing quality recommendations | `filter`, `limit` |

**Use Cases**:
- Sales and traffic analysis
- Seller performance monitoring
- Listing optimization recommendations
- Customer service metrics

---

### Communication (7 tools)

Tools for buyer-seller messaging and feedback.

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `ebay_search_messages` | Search messages with filters | `filter`, `limit` |
| `ebay_get_message` | Get message details | `messageId` |
| `ebay_send_message` | Send message to buyer | `itemId`, `memberName`, `body` |
| `ebay_reply_to_message` | Reply to existing message | `messageId`, `body` |
| `ebay_get_feedback` | Get feedback for transactions | `feedbackType`, `limit` |
| `ebay_get_feedback_summary` | Get feedback summary statistics | None |
| `ebay_leave_feedback_for_buyer` | Leave feedback for buyer | `orderLineItemId`, `commentText`, `ratingValue` |

**Use Cases**:
- Customer support and messaging
- Feedback management
- Dispute resolution communication

---

### Metadata & Policies (33 tools)

Tools for retrieving eBay policies, category data, and configuration.

#### Category & Taxonomy (7 tools)
| Tool | Description |
|------|-------------|
| `ebay_get_default_category_tree_id` | Get default category tree for marketplace |
| `ebay_get_category_tree` | Get category hierarchy |
| `ebay_get_category_suggestions` | Get category suggestions for query |
| `ebay_get_item_aspects_for_category` | Get required/recommended aspects |
| `ebay_get_product_compatibilities` | Get product compatibility by category |
| `ebay_create_or_replace_product_compatibility` | Set product compatibility |
| `ebay_delete_product_compatibility` | Remove product compatibility |

#### Policies (16 tools)
| Tool | Description |
|------|-------------|
| `ebay_get_return_policies` | List return policies |
| `ebay_get_return_policy` | Get return policy by ID |
| `ebay_get_return_policy_by_name` | Find return policy by name |
| `ebay_update_return_policy` | Update return policy |
| `ebay_delete_return_policy` | Delete return policy |
| `ebay_get_payment_policies` | List payment policies |
| `ebay_get_payment_policy` | Get payment policy by ID |
| `ebay_get_payment_policy_by_name` | Find payment policy by name |
| `ebay_update_payment_policy` | Update payment policy |
| `ebay_delete_payment_policy` | Delete payment policy |
| `ebay_get_custom_policies` | List custom policies |
| `ebay_get_custom_policy` | Get custom policy by ID |
| `ebay_create_custom_policy` | Create custom policy |
| `ebay_update_custom_policy` | Update custom policy |
| `ebay_delete_custom_policy` | Delete custom policy |
| `ebay_get_category_policies` | Get policies for category |

#### Sales Tax (5 tools)
| Tool | Description |
|------|-------------|
| `ebay_get_sales_tax` | Get sales tax for jurisdiction |
| `ebay_get_sales_taxes` | List all sales tax configurations |
| `ebay_get_sales_tax_jurisdictions` | List available tax jurisdictions |
| `ebay_create_or_replace_sales_tax` | Set sales tax rate |
| `ebay_bulk_create_or_replace_sales_tax` | Bulk set sales tax rates |
| `ebay_delete_sales_tax` | Remove sales tax configuration |

#### Regulatory & Compliance (5 tools)
| Tool | Description |
|------|-------------|
| `ebay_get_regulatory_policies` | Get regulatory policies for category |
| `ebay_get_extended_producer_responsibility_policies` | Get EPR policies |
| `ebay_get_hazardous_materials_labels` | Get hazmat label requirements |
| `ebay_get_product_safety_labels` | Get product safety label requirements |
| `ebay_get_currencies` | List supported currencies |

**Use Cases**:
- Category selection and optimization
- Business policy configuration
- Tax compliance
- Regulatory compliance
- Product compatibility setup

---

### Compliance & Legal (3 tools)

Tools for handling violations and intellectual property.

| Tool | Description | Key Parameters |
|------|-------------|----------------|
| `ebay_get_listing_violations` | Get active listing violations | `complianceType`, `offset`, `limit` |
| `ebay_get_listing_violations_summary` | Get violation summary | `complianceType` |
| `ebay_suppress_violation` | Suppress a violation | `complianceType`, `listingId` |
| `ebay_report_infringement` | Report IP infringement (VERO) | `details` |
| `ebay_get_reported_items` | Get previously reported items | None |

**Use Cases**:
- Compliance monitoring
- Violation resolution
- Intellectual property protection

---

### Utilities (24 tools)

Miscellaneous utility tools for various operations.

#### Compatibility & Aspects (4 tools)
| Tool | Description |
|------|-------------|
| `ebay_get_compatibilities_by_specification` | Get compatible products |
| `ebay_get_compatibility_property_names` | Get compatibility property names |
| `ebay_get_compatibility_property_values` | Get compatibility property values |
| `ebay_get_multi_compatibility_property_values` | Get multiple property values |

#### Listing Policies (12 tools)
| Tool | Description |
|------|-------------|
| `ebay_get_automotive_parts_compatibility_policies` | Auto parts policies |
| `ebay_get_classified_ad_policies` | Classified ad policies |
| `ebay_get_item_condition_policies` | Item condition policies |
| `ebay_get_listing_structure_policies` | Listing structure policies |
| `ebay_get_listing_type_policies` | Listing type policies (auction/fixed) |
| `ebay_get_motors_listing_policies` | Motors category policies |
| `ebay_get_negotiated_price_policies` | Best offer policies |
| `ebay_get_rate_tables` | Shipping rate tables |
| `ebay_get_shipping_cost_type_policies` | Shipping cost policies |
| `ebay_get_shipping_policies` | Shipping policies |
| `ebay_get_site_visibility_policies` | Site visibility policies |

#### Other Utilities (8 tools)
| Tool | Description |
|------|-------------|
| `ebay_translate` | Translate text to target language |
| `ebay_convert_date_to_timestamp` | Convert date string to ISO timestamp |
| `ebay_create_notification_destination` | Create notification endpoint |
| `ebay_get_notification_config` | Get notification configuration |
| `ebay_update_notification_config` | Update notification settings |

**Use Cases**:
- Product compatibility matching
- Multi-language listings
- Webhook notifications
- Date/time utilities

---

## Tool Schema System

All tools use **Zod** for runtime input validation. Schemas are defined in `src/tools/schemas.ts` and imported into `tool-definitions.ts`.

### Schema Categories

| Schema File | Purpose | Examples |
|-------------|---------|----------|
| `schemas.ts` | Input validation | `fulfillmentPolicySchema`, `offerSchema`, `inventoryItemSchema` |
| `ebay-enums.ts` | Enum types | `MarketplaceId`, `Condition`, `FormatType`, `OrderPaymentStatus` |

### Example Schema

```typescript
// From schemas.ts
export const offerSchema = z.object({
  sku: z.string().min(1),
  marketplaceId: z.nativeEnum(MarketplaceId),
  format: z.nativeEnum(FormatType),
  listingDescription: z.string().optional(),
  pricingSummary: z.object({
    price: z.object({
      value: z.string(),
      currency: z.string()
    })
  }),
  // ... more fields
});
```

### Schema Usage

```typescript
// From tool-definitions.ts
{
  name: 'ebay_create_offer',
  description: 'Create a new offer from an inventory item',
  inputSchema: zodToJsonSchema(offerSchema),
}
```

## Tool Execution Flow

```
AI Assistant Request
       ↓
MCP Server (index.ts)
       ↓
Tool Dispatcher (tools/index.ts)
       ↓
Input Validation (Zod schemas)
       ↓
API Method (api/*/index.ts)
       ↓
HTTP Request (api/client.ts)
       ↓
eBay API
       ↓
Response Processing
       ↓
Return to AI Assistant
```

## Adding New Tools

To add a new tool:

1. **Define Schema** in `schemas.ts`:
   ```typescript
   export const myNewToolSchema = z.object({
     param1: z.string(),
     param2: z.number().optional()
   });
   ```

2. **Add Tool Definition** in `tool-definitions.ts`:
   ```typescript
   {
     name: 'ebay_my_new_tool',
     description: 'What this tool does',
     inputSchema: zodToJsonSchema(myNewToolSchema),
   }
   ```

3. **Add API Method** in appropriate `api/*/index.ts`:
   ```typescript
   async myNewTool(param1: string, param2?: number) {
     return this.client.get('/endpoint', { params: { param1, param2 } });
   }
   ```

4. **Add Dispatcher Case** in `tools/index.ts`:
   ```typescript
   case 'ebay_my_new_tool': {
     const validated = myNewToolSchema.parse(args);
     return await api.category.myNewTool(validated.param1, validated.param2);
   }
   ```

5. **Add Tests** in `tests/unit/tools/`:
   ```typescript
   describe('ebay_my_new_tool', () => {
     it('should validate input correctly', () => {
       // Test schema validation
     });

     it('should call API correctly', () => {
       // Test API call
     });
   });
   ```

## Best Practices

### Schema Design
- ✅ Use `z.nativeEnum()` for eBay enum types (MarketplaceId, Condition, etc.)
- ✅ Mark optional fields with `.optional()`
- ✅ Add descriptions with `.describe()` for better AI understanding
- ✅ Use strict validation (no `.passthrough()` unless necessary)

### Tool Naming
- ✅ Prefix all tools with `ebay_`
- ✅ Use verb-noun pattern: `ebay_get_item`, `ebay_create_offer`
- ✅ Use consistent verbs: `get`, `create`, `update`, `delete`, `list`

### Error Handling
- ✅ Let Zod handle input validation errors
- ✅ Let axios interceptors handle HTTP errors
- ✅ Provide clear error messages in tool descriptions

### Documentation
- ✅ Describe what the tool does (not how)
- ✅ Mention required vs optional parameters
- ✅ Include use cases in description
- ✅ Note any rate limits or restrictions

## Testing

Run tool tests:
```bash
npm run test tests/unit/tools/
npm run test:coverage
```

Current test coverage:
- **Functions**: 99%+
- **Lines**: 85%+
- **Branches**: 71%+

## Rate Limits

Tools respect eBay API rate limits:
- **User Tokens**: 10,000-50,000 requests/day (depending on account level)
- **Client Credentials**: 1,000 requests/day
- **Per-minute**: 5,000 requests/minute (client-side enforcement)

Automatic handling:
- ✅ 429 errors trigger exponential backoff retry
- ✅ Rate limit headers tracked (`x-ebay-c-ratelimit-remaining`)
- ✅ Token auto-refresh on 401 errors

## OAuth Scopes

Tools require appropriate OAuth scopes. Default scopes include:
- `https://api.ebay.com/oauth/api_scope/sell.inventory`
- `https://api.ebay.com/oauth/api_scope/sell.account`
- `https://api.ebay.com/oauth/api_scope/sell.fulfillment`
- `https://api.ebay.com/oauth/api_scope/sell.marketing`
- `https://api.ebay.com/oauth/api_scope/sell.analytics.readonly`
- And 15+ more scopes

See `config/environment.ts` for full scope list.

## Related Documentation

- `../api/README.md` - API client implementation
- `../types/README.md` - TypeScript type definitions
- `../../docs/auth/README.md` - OAuth setup guide
- `../../CLAUDE.md` - Developer guide for Claude Code
- `../../CROSS-PLATFORM-IMPROVEMENTS.md` - Cross-platform script optimizations

## Support

For issues or questions:
- GitHub Issues: [github.com/your-repo/issues](https://github.com/curt6815/ebay-api-mcp-server/issues)
- eBay API Documentation: [developer.ebay.com](https://developer.ebay.com)
- MCP Specification: [modelcontextprotocol.io](https://modelcontextprotocol.io)
