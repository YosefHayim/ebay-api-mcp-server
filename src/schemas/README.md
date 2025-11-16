# eBay MCP API Schemas

This directory contains comprehensive Zod schemas for all eBay API endpoints, organized by functional area. These schemas provide both **input validation** and **output type safety** for MCP (Model Context Protocol) tools.

## 📁 Directory Structure

```
src/schemas/
├── account-management/    # Account, policies, programs
│   └── account.ts
├── inventory-management/  # Inventory items, offers, locations
│   └── inventory.ts
├── communication/         # Messages, feedback, notifications
│   └── messages.ts
├── fulfillment/          # Orders, shipping, refunds
│   └── orders.ts
├── marketing/            # Campaigns, ads, promotions (TODO)
├── analytics/            # Reports, metrics (TODO)
├── metadata/             # Taxonomy, compatibility (TODO)
├── other/                # Compliance, VERO, translation (TODO)
├── index.ts              # Central export point
└── README.md             # This file
```

## 🎯 Purpose

The schemas in this directory serve multiple purposes:

1. **Input Validation**: Validate request parameters before sending to eBay APIs
2. **Output Validation**: Ensure API responses match expected structures
3. **Type Safety**: Provide TypeScript types for compile-time checking
4. **JSON Schema Generation**: Convert Zod schemas to JSON Schema format for MCP tools
5. **Documentation**: Self-documenting code with schema descriptions

## 🚀 Usage

### Basic Import

```typescript
import {
  getAccountManagementJsonSchemas,
  getInventoryManagementJsonSchemas,
  getCommunicationJsonSchemas,
  getFulfillmentJsonSchemas,
} from '@/schemas';

// Get all JSON schemas for a specific category
const accountSchemas = getAccountManagementJsonSchemas();

// Access specific schemas
const inputSchema = accountSchemas.getFulfillmentPoliciesInput;
const outputSchema = accountSchemas.getFulfillmentPoliciesOutput;
```

### Using Zod Schemas for Validation

```typescript
import { getInventoryItemInputSchema, getInventoryItemOutputSchema } from '@/schemas';

// Validate input
const input = getInventoryItemInputSchema.parse({
  sku: 'ABC123'
});

// Validate output
const response = await api.inventory.getInventoryItem(input.sku);
const validatedOutput = getInventoryItemOutputSchema.parse(response);
```

### Using JSON Schemas with MCP Tools

```typescript
import { getInventoryManagementJsonSchemas } from '@/schemas';

const schemas = getInventoryManagementJsonSchemas();

// Use in MCP tool definition
const tool = {
  name: 'ebay_get_inventory_item',
  description: 'Get a specific inventory item by SKU',
  inputSchema: schemas.getInventoryItemInput,
  outputSchema: schemas.getInventoryItemOutput,
};
```

## 📚 Available Schema Categories

### 1. Account Management (`account-management/account.ts`)

Schemas for managing seller account settings, business policies, and programs.

**Endpoints Covered:**
- Custom Policies (PRODUCT_COMPLIANCE, TAKE_BACK)
- Fulfillment Policies (shipping rules, handling time)
- Payment Policies (payment methods, immediate pay)
- Return Policies (return period, refund method)
- Sales Tax (jurisdiction-based tax rules)
- Programs (opt-in/opt-out programs)
- KYC (seller verification status)
- Privileges (selling limits and permissions)

**Key Schemas:**
- `getFulfillmentPoliciesInputSchema` / `getFulfillmentPoliciesOutputSchema`
- `createPaymentPolicyInputSchema` / `createPaymentPolicyOutputSchema`
- `getReturnPoliciesInputSchema` / `getReturnPoliciesOutputSchema`

### 2. Inventory Management (`inventory-management/inventory.ts`)

Schemas for inventory items, offers, locations, and product compatibility.

**Endpoints Covered:**
- Inventory Items (create, read, update, delete)
- Offers (pricing, availability, publishing)
- Inventory Locations (warehouses, stores)
- Product Compatibility (vehicle parts)
- Inventory Item Groups (variations)
- Bulk Operations (batch processing)

**Key Schemas:**
- `getInventoryItemsInputSchema` / `getInventoryItemsOutputSchema`
- `createOfferInputSchema` / `createOfferOutputSchema`
- `publishOfferInputSchema` / `publishOfferOutputSchema`
- `bulkInventoryItemRequestSchema` / `bulkInventoryItemResponseSchema`

### 3. Communication (`communication/messages.ts`)

Schemas for messages, feedback, notifications, and negotiations.

**Endpoints Covered:**
- Message API (conversations, messages)
- Feedback API (leave feedback, respond to feedback)
- Notification API (destinations, subscriptions, topics)
- Negotiation API (offers to buyers)

**Key Schemas:**
- `sendMessageInputSchema` / `sendMessageOutputSchema`
- `leaveFeedbackInputSchema` / `leaveFeedbackOutputSchema`
- `createNotificationSubscriptionInputSchema` / `createNotificationSubscriptionOutputSchema`
- `sendOfferToInterestedBuyersInputSchema` / `sendOfferToInterestedBuyersOutputSchema`

### 4. Fulfillment (`fulfillment/orders.ts`)

Schemas for order management, shipping, refunds, and payment disputes.

**Endpoints Covered:**
- Orders (retrieve, filter orders)
- Shipping Fulfillment (create, track shipments)
- Refunds (issue refunds)
- Payment Disputes (manage buyer disputes)

**Key Schemas:**
- `getOrdersInputSchema` / `getOrdersOutputSchema`
- `createShippingFulfillmentInputSchema` / `createShippingFulfillmentOutputSchema`
- `issueRefundInputSchema` / `issueRefundOutputSchema`
- `getPaymentDisputesInputSchema` / `getPaymentDisputesOutputSchema`

## 🔧 Schema Naming Convention

All schemas follow a consistent naming pattern:

- **Input Schemas**: `{actionName}InputSchema`
  - Example: `getOrdersInputSchema`, `createOfferInputSchema`

- **Output Schemas**: `{actionName}OutputSchema`
  - Example: `getOrdersOutputSchema`, `createOfferOutputSchema`

- **Detail/Entity Schemas**: `{entityName}Schema`
  - Example: `orderSchema`, `offerResponseSchema`, `lineItemSchema`

## 🛠️ Adding New Schemas

When adding schemas for new endpoints:

1. **Create a new file** in the appropriate category folder
2. **Import required enums** from `@/types/ebay-enums.js`
3. **Define Zod schemas** for inputs and outputs
4. **Add JSON Schema converter function** (e.g., `getMarketingJsonSchemas()`)
5. **Export from `index.ts`**
6. **Update this README** with the new category

### Example Template:

```typescript
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Common schemas
const errorSchema = z.object({...});

// Input schema
export const actionNameInputSchema = z.object({
  param1: z.string().describe('Description'),
  param2: z.number().optional(),
});

// Output schema
export const actionNameOutputSchema = z.object({
  result: z.string().optional(),
  warnings: z.array(errorSchema).optional(),
});

// JSON Schema conversion
export function getCategoryJsonSchemas() {
  return {
    actionNameInput: zodToJsonSchema(actionNameInputSchema, 'actionNameInput'),
    actionNameOutput: zodToJsonSchema(actionNameOutputSchema, 'actionNameOutput'),
  };
}
```

## 🧪 Testing Schemas

To test schema validation:

```typescript
import { describe, it, expect } from 'vitest';
import { getInventoryItemInputSchema } from '@/schemas';

describe('Inventory Schemas', () => {
  it('should validate correct input', () => {
    const result = getInventoryItemInputSchema.safeParse({
      sku: 'TEST-SKU-123'
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid input', () => {
    const result = getInventoryItemInputSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
```

## 📖 Related Documentation

- [Zod Documentation](https://zod.dev/)
- [zod-to-json-schema](https://github.com/StefanTerdell/zod-to-json-schema)
- [eBay API Documentation](https://developer.ebay.com/api-docs/)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)

## 🎨 Design Principles

1. **DRY (Don't Repeat Yourself)**: Reuse common schemas (error, amount, address)
2. **Type Safety**: Leverage TypeScript and Zod for compile-time and runtime safety
3. **Descriptive**: Use `.describe()` to document schema fields
4. **Optional by Default**: Make fields optional unless they're truly required
5. **Passthrough**: Use `.passthrough()` to allow additional properties from eBay
6. **Enum Support**: Use native enums from `@/types/ebay-enums.js`

## 🚧 TODO

- [ ] Marketing API schemas (campaigns, ads, promotions)
- [ ] Analytics API schemas (reports, metrics)
- [ ] Metadata API schemas (taxonomy, compatibility)
- [ ] Other APIs (compliance, VERO, translation)
- [ ] Integration tests for all schemas
- [ ] Schema validation benchmarks

## 📝 Notes

- All schemas use `.optional()` for fields that may not be present in responses
- Error schemas are consistent across all endpoints
- Amount schemas support currency conversion fields
- Date fields use ISO 8601 string format
- All schemas support eBay's standard pagination (href, limit, offset, etc.)

---

**Last Updated**: 2025-11-16
**Zod Version**: 3.x
**zod-to-json-schema Version**: 3.24.6
