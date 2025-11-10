# Zod Schemas for Tool Input Validation

This directory contains Zod schemas for validating the inputs of the MCP tools. The schemas are organized in subdirectories that mirror the structure of the `src/api` directory.

## Workflow for Creating Zod Schemas

To create a new Zod schema for a tool, follow these steps:

### 1. Identify the API Operation

Find the API implementation file in the `src/api` directory that contains the tool's functionality. Note the API methods and their parameters.

**Example:** For feedback API, check `src/api/communication/feedback.ts`

### 2. Locate the OpenAPI TypeScript Types

In the `src/types` directory, find the corresponding OpenAPI type definition file. The file names follow the pattern `{api_name}_v{version}_oas3.ts`.

**Examples:**
- Feedback API → `src/types/commerce_feedback_v1_beta_oas3.ts`
- Message API → `src/types/commerce_message_v1_oas3.ts`
- Negotiation API → `src/types/sell_negotiation_v1_oas3.ts`
- Notification API → `src/types/commerce_notification_v1_oas3.ts`

### 3. Import the OpenAPI Types

In your Zod schema file, import the `operations` and `components` types from the corresponding OpenAPI type file:

```typescript
import { z } from "zod";
import type { operations, components } from "../../types/{api_spec_file}.js";
```

### 4. Extract Relevant Type References

Create type aliases for the operation parameters and request/response bodies. These serve as documentation and ensure type safety:

```typescript
// Extract operation parameter types for reference
type GetFeedbackParams = operations["getFeedback"]["parameters"]["query"];
type LeaveFeedbackRequest = components["schemas"]["LeaveFeedbackRequest"];
```

**Note:** These type aliases will show as "unused" in TypeScript but serve as important documentation for schema developers.

### 5. Create Reusable Schema Components

Identify common parameters across endpoints and create reusable schemas:

```typescript
// Common pagination parameters
const limitSchema = z.string({
  invalid_type_error: "limit must be a string",
  description: "Maximum number of items to return"
}).optional();

const offsetSchema = z.string({
  invalid_type_error: "offset must be a string",
  description: "Number of items to skip"
}).optional();

// Dynamic schema generators for repeated patterns
const idSchema = (name: string, description: string) =>
  z.string({
    message: `${name} is required`,
    required_error: `${name.toLowerCase().replace(/\s+/g, '_')} is required`,
    invalid_type_error: `${name.toLowerCase().replace(/\s+/g, '_')} must be a string`,
    description
  });
```

### 6. Build the Zod Schemas

Create Zod schemas based on the OpenAPI operation types. For each schema:

- **Document the endpoint** in a comment
- **Reference the OpenAPI type** being validated
- **List all parameters/fields** from the operation
- **Apply appropriate validation** (required, optional, constraints)

```typescript
/**
 * Schema for getFeedback method
 * Endpoint: GET /feedback
 * Params: GetFeedbackParams - user_id (required), feedback_type (required), ...
 */
export const getFeedbackSchema = z.object({
  user_id: z.string({
    message: "User ID is required",
    required_error: "user_id is required",
    invalid_type_error: "user_id must be a string",
    description: "The unique identifier (eBay username) of the user"
  }),
  feedback_type: z.string({
    message: "Feedback type is required",
    required_error: "feedback_type is required",
    invalid_type_error: "feedback_type must be a string",
    description: "Type of feedback (FEEDBACK_RECEIVED or FEEDBACK_SENT)"
  }),
  // ... other fields
});
```

### 7. Enhance Field Validation

For each field, provide comprehensive validation:

- **`description`**: Clear explanation of the field's purpose
- **`message`**: Custom error message for general validation failures
- **`required_error`**: Error message when a required field is missing
- **`invalid_type_error`**: Error message for incorrect data types
- **Constraints**: Use Zod validators like `.min()`, `.max()`, `.email()`, `.url()`, `.regex()`, etc.
- **Type Coercion**: Use `z.coerce.number()` for query parameters that need numeric conversion

**Important Notes:**
- eBay API query parameters are typically **strings**, not numbers
- Do not use `z.coerce.number()` unless the API implementation explicitly requires it
- Match field names to the API parameter names (use snake_case for consistency)

### 8. Update Tool Dispatcher

In `src/tools/index.ts`:

1. Import your Zod schemas:
```typescript
import {
  getFeedbackSchema,
  leaveFeedbackForBuyerSchema,
  // ... other schemas
} from "../utils/communication/feedback.js";
```

2. Add validation to tool cases:
```typescript
case "ebay_get_feedback": {
  const validated = getFeedbackSchema.parse(args);
  return api.feedback.getFeedback(
    validated.user_id,
    validated.feedback_type,
    validated.feedback_id,
    // ... other parameters
  );
}
```

### 9. Verify Type Safety

Run TypeScript compiler to verify:
```bash
npx tsc --noEmit
```

Expected warnings:
- Type aliases declared but never used (these are documentation)
- Unused reusable schemas (may be used in future schemas)

### Complete Example

See `src/utils/communication/feedback.ts` for a complete reference implementation showing:
- Proper OpenAPI type imports
- Type reference documentation
- Reusable schema components
- Comprehensive field validation
- Nested object schemas
- Array validation with constraints

## Missing Zod Schemas

The following is a list of Zod schemas that need to be created. The list is based on the API implementation files in the `src/api` directory.

### Account Management
- [x] `account.ts`

### Analytics and Report
- [ ] `analytics.ts`

### Communication
- [x] `feedback.ts`
- [x] `message.ts`
- [x] `negotiation.ts`
- [x] `notification.ts`

### Listing Management
- [ ] `inventory.ts`

### Listing Metadata
- [ ] `metadata.ts`
- [ ] `taxonomy.ts`

### Marketing and Promotions
- [ ] `marketing.ts`
- [ ] `recommendation.ts`

### Order Management
- [ ] `dispute.ts`
- [ ] `fulfillment.ts`

### Other
- [x] `compliance.ts`
- [x] `edelivery.ts`
- [x] `identity.ts`
- [x] `translation.ts`
- [x] `vero.ts`