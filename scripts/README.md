# Type Generation Scripts

This directory contains scripts for automatically generating TypeScript types from OpenAPI specifications.

## Quick Start

```bash
npm run generate:types
```

This command generates TypeScript types for all eBay APIs from the OpenAPI specs in the `docs/` folder.

## Overview

The type generation workflow uses `openapi-typescript` to convert eBay's OpenAPI 3.0 specifications into type-safe TypeScript definitions.

### Flow Diagram

```
docs/sell-apps/
├── account-management/
│   └── sell_account_v1_oas3.json ──────┐
├── order-management/                    │
│   └── sell_fulfillment_v1_oas3.json ───┤
├── listing-management/                  │
│   └── sell_inventory_v1_oas3.json ─────┤
├── listing-metadata/                    │
│   └── sell_metadata_v1_oas3.json ──────┤
├── analytics-and-report/                │
│   └── sell_analytics_v1_oas3.json ─────┤
├── markeitng-and-promotions/            │
│   ├── sell_marketing_v1_oas3.json ─────┤
│   └── sell_recommendation_v1_oas3.json ┤
├── communication/                       │
│   ├── sell_negotiation_v1_oas3.json ───┤  openapi-typescript
│   ├── commerce_feedback_v1_beta_oas3.json  ────────────►
│   ├── commerce_notification_v1_oas3.json   conversion
│   └── commerce_message_v1_oas3.json ───┤
└── other-apis/                          │
    ├── commerce_identity_v1_oas3.json ──┤
    ├── commerce_vero_v1_oas3.json ──────┤
    ├── sell_compliance_v1_oas3.json ────┤
    └── commerce_translation_v1_beta_oas3.json
                                         │
                                         │
                                         ▼
            src/types/openapi-schemas/
            ├── sell_account_v1_oas3.ts
            ├── sell_fulfillment_v1_oas3.ts
            ├── sell_inventory_v1_oas3.ts
            ├── sell_metadata_v1_oas3.ts
            ├── sell_analytics_v1_oas3.ts
            ├── sell_marketing_v1_oas3.ts
            ├── sell_recommendation_v1_oas3.ts
            ├── sell_negotiation_v1_oas3.ts
            ├── commerce_feedback_v1_beta_oas3.ts
            ├── commerce_notification_v1_oas3.ts
            ├── commerce_message_v1_oas3.ts
            ├── commerce_identity_v1_oas3.ts
            ├── commerce_vero_v1_oas3.ts
            ├── sell_compliance_v1_oas3.ts
            └── commerce_translation_v1_beta_oas3.ts
```

## Script: generate-types.sh

### What It Does

1. **Validates Environment**: Ensures script runs from project root
2. **Creates Output Directory**: Creates `src/types/openapi-schemas/` if needed
3. **Processes Each Spec**: Iterates through all OpenAPI JSON files
4. **Generates TypeScript Types**: Uses `openapi-typescript` for conversion
5. **Reports Results**: Shows success/failure summary

### Features

- ✅ **Colored Output**: Easy-to-read progress indicators
- ✅ **Error Handling**: Continues processing even if individual files fail
- ✅ **Mapping System**: Explicit docs-to-output path mapping
- ✅ **Silent Mode**: Suppresses verbose openapi-typescript output
- ✅ **Exit Codes**: Returns non-zero on errors for CI/CD integration

### Output

The script generates TypeScript definition files with:
- **Type-safe interfaces** for all API schemas
- **Discriminated unions** for polymorphic responses
- **Proper JSDoc comments** from OpenAPI descriptions
- **Enum types** for fixed value sets

### Example Generated Type Usage

```typescript
// Import generated types
import type { components } from "./types/openapi-schemas/sell_inventory_v1_oas3.js";

// Use strongly-typed interfaces
type InventoryItem = components["schemas"]["InventoryItem"];
type Offer = components["schemas"]["Offer"];

// Type-safe function signatures
async function getInventoryItem(sku: string): Promise<InventoryItem> {
  // Implementation uses correctly typed responses
}
```

## Folder Mapping

The script uses explicit path mappings to control where types are generated:

| Docs Folder | OpenAPI Spec | Generated Type |
|-------------|--------------|----------------|
| `sell-apps/account-management/` | `sell_account_v1_oas3.json` | `src/types/openapi-schemas/sell_account_v1_oas3.ts` |
| `sell-apps/order-management/` | `sell_fulfillment_v1_oas3.json` | `src/types/openapi-schemas/sell_fulfillment_v1_oas3.ts` |
| `sell-apps/listing-management/` | `sell_inventory_v1_oas3.json` | `src/types/openapi-schemas/sell_inventory_v1_oas3.ts` |
| `sell-apps/listing-metadata/` | `sell_metadata_v1_oas3.json` | `src/types/openapi-schemas/sell_metadata_v1_oas3.ts` |
| `sell-apps/analytics-and-report/` | `sell_analytics_v1_oas3.json` | `src/types/openapi-schemas/sell_analytics_v1_oas3.ts` |
| `sell-apps/markeitng-and-promotions/` | `sell_marketing_v1_oas3.json` | `src/types/openapi-schemas/sell_marketing_v1_oas3.ts` |
| `sell-apps/markeitng-and-promotions/` | `sell_recommendation_v1_oas3.json` | `src/types/openapi-schemas/sell_recommendation_v1_oas3.ts` |
| `sell-apps/communication/` | `sell_negotiation_v1_oas3.json` | `src/types/openapi-schemas/sell_negotiation_v1_oas3.ts` |
| `sell-apps/communication/` | `commerce_feedback_v1_beta_oas3.json` | `src/types/openapi-schemas/commerce_feedback_v1_beta_oas3.ts` |
| `sell-apps/communication/` | `commerce_notification_v1_oas3.json` | `src/types/openapi-schemas/commerce_notification_v1_oas3.ts` |
| `sell-apps/communication/` | `commerce_message_v1_oas3.json` | `src/types/openapi-schemas/commerce_message_v1_oas3.ts` |
| `sell-apps/other-apis/` | `commerce_identity_v1_oas3.json` | `src/types/openapi-schemas/commerce_identity_v1_oas3.ts` |
| `sell-apps/other-apis/` | `commerce_vero_v1_oas3.json` | `src/types/openapi-schemas/commerce_vero_v1_oas3.ts` |
| `sell-apps/other-apis/` | `sell_compliance_v1_oas3.json` | `src/types/openapi-schemas/sell_compliance_v1_oas3.ts` |
| `sell-apps/other-apis/` | `commerce_translation_v1_beta_oas3.json` | `src/types/openapi-schemas/commerce_translation_v1_beta_oas3.ts` |

## Adding New Specs

To add a new OpenAPI specification:

1. **Add the spec file** to the appropriate `docs/sell-apps/*/` folder
2. **Edit `generate-types.sh`** and add a new entry to the `SPEC_MAPPINGS` array:

```bash
declare -a SPEC_MAPPINGS=(
    # ... existing mappings ...

    # Your New API
    "sell-apps/your-folder:your_api_v1_oas3.json:your_api_v1_oas3.ts"
)
```

3. **Run the generator**:
```bash
npm run generate:types
```

## Manual Usage

You can also run the script directly:

```bash
# From project root
./scripts/generate-types.sh

# Or with bash explicitly
bash scripts/generate-types.sh
```

## Troubleshooting

### Script Won't Execute

```bash
# Make sure it's executable
chmod +x scripts/generate-types.sh

# Check line endings (must be Unix LF, not Windows CRLF)
file scripts/generate-types.sh
# Should show: "Bourne-Again shell script text executable"
```

### "Input file not found" Error

- Verify the OpenAPI JSON file exists in the `docs/` folder
- Check the path in `SPEC_MAPPINGS` array matches the actual file location
- Ensure folder names are correct (note: `markeitng-and-promotions` has a typo)

### Generation Fails for Specific File

- Validate the OpenAPI JSON is valid (use https://editor.swagger.io/)
- Check for syntax errors in the JSON file
- Try generating that specific file manually:
  ```bash
  npx openapi-typescript docs/path/to/spec.json -o output.ts
  ```

### Types Not Updating

- Generated files are cached - delete and regenerate:
  ```bash
  rm -rf src/types/openapi-schemas/
  npm run generate:types
  ```

## CI/CD Integration

The script exits with status code 1 if any errors occur, making it suitable for CI/CD:

```yaml
# Example GitHub Actions workflow
- name: Generate TypeScript Types
  run: npm run generate:types

- name: Verify Types Compile
  run: npm run typecheck
```

## Dependencies

- **openapi-typescript**: v7.10.1+ (installed as devDependency)
- **Node.js**: 18.0.0+
- **Bash**: 3.0+ (macOS/Linux standard)

## See Also

- [openapi-typescript Documentation](https://github.com/drwpow/openapi-typescript)
- [eBay API Documentation](https://developer.ebay.com/api-docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
