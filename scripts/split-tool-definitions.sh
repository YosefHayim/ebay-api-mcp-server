#!/bin/bash

###############################################################################
# Split tool-definitions.ts into organized category files
#
# This script automates the process of splitting the large tool-definitions.ts
# file (1,402 lines) into smaller, category-specific files for better
# readability and reduced AI context consumption.
###############################################################################

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TOOLS_DIR="$PROJECT_ROOT/src/tools"
DEFS_DIR="$TOOLS_DIR/definitions"
SOURCE_FILE="$TOOLS_DIR/tool-definitions.ts"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Splitting tool-definitions.ts into organized files${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════════════${NC}"
echo ""

# Create definitions directory
mkdir -p "$DEFS_DIR"

# Extract line numbers for each section
echo -e "${CYAN}Step 1/3: Analyzing tool-definitions.ts structure...${NC}"

# Find start and end lines for each category
ACCOUNT_START=$(grep -n "^export const accountTools" "$SOURCE_FILE" | cut -d: -f1)
INVENTORY_START=$(grep -n "^export const inventoryTools" "$SOURCE_FILE" | cut -d: -f1)
FULFILLMENT_START=$(grep -n "^export const fulfillmentTools" "$SOURCE_FILE" | cut -d: -f1)
MARKETING_START=$(grep -n "^export const marketingTools" "$SOURCE_FILE" | cut -d: -f1)
ANALYTICS_START=$(grep -n "^export const analyticsTools" "$SOURCE_FILE" | cut -d: -f1)
METADATA_START=$(grep -n "^export const metadataTools" "$SOURCE_FILE" | cut -d: -f1)
TAXONOMY_START=$(grep -n "^export const taxonomyTools" "$SOURCE_FILE" | cut -d: -f1)
COMMUNICATION_START=$(grep -n "^export const communicationTools" "$SOURCE_FILE" | cut -d: -f1)
OTHER_START=$(grep -n "^export const otherApiTools" "$SOURCE_FILE" | cut -d: -f1)

echo -e "${GREEN}✅ Found 9 tool categories to split${NC}"

# Extract imports and type definition
echo -e "\n${CYAN}Step 2/3: Extracting shared imports and types...${NC}"

# Get imports (lines 1-40)
sed -n '1,40p' "$SOURCE_FILE" > "$DEFS_DIR/.temp_header"

echo -e "${GREEN}✅ Extracted shared imports${NC}"

# Create individual category files
echo -e "\n${CYAN}Step 3/3: Creating category files...${NC}"

# Account tools
ACCOUNT_END=$((INVENTORY_START - 2))
cat "$DEFS_DIR/.temp_header" > "$DEFS_DIR/account.ts"
sed -n "${ACCOUNT_START},${ACCOUNT_END}p" "$SOURCE_FILE" >> "$DEFS_DIR/account.ts"
echo -e "${GREEN}✅ Created account.ts ($(wc -l < "$DEFS_DIR/account.ts") lines)${NC}"

# Inventory tools
INVENTORY_END=$((FULFILLMENT_START - 2))
cat "$DEFS_DIR/.temp_header" > "$DEFS_DIR/inventory.ts"
sed -n "${INVENTORY_START},${INVENTORY_END}p" "$SOURCE_FILE" >> "$DEFS_DIR/inventory.ts"
echo -e "${GREEN}✅ Created inventory.ts ($(wc -l < "$DEFS_DIR/inventory.ts") lines)${NC}"

# Fulfillment tools
FULFILLMENT_END=$((MARKETING_START - 2))
cat "$DEFS_DIR/.temp_header" > "$DEFS_DIR/fulfillment.ts"
sed -n "${FULFILLMENT_START},${FULFILLMENT_END}p" "$SOURCE_FILE" >> "$DEFS_DIR/fulfillment.ts"
echo -e "${GREEN}✅ Created fulfillment.ts ($(wc -l < "$DEFS_DIR/fulfillment.ts") lines)${NC}"

# Marketing tools
MARKETING_END=$((ANALYTICS_START - 2))
cat "$DEFS_DIR/.temp_header" > "$DEFS_DIR/marketing.ts"
sed -n "${MARKETING_START},${MARKETING_END}p" "$SOURCE_FILE" >> "$DEFS_DIR/marketing.ts"
echo -e "${GREEN}✅ Created marketing.ts ($(wc -l < "$DEFS_DIR/marketing.ts") lines)${NC}"

# Analytics tools
ANALYTICS_END=$((METADATA_START - 2))
cat "$DEFS_DIR/.temp_header" > "$DEFS_DIR/analytics.ts"
sed -n "${ANALYTICS_START},${ANALYTICS_END}p" "$SOURCE_FILE" >> "$DEFS_DIR/analytics.ts"
echo -e "${GREEN}✅ Created analytics.ts ($(wc -l < "$DEFS_DIR/analytics.ts") lines)${NC}"

# Metadata tools
METADATA_END=$((TAXONOMY_START - 2))
cat "$DEFS_DIR/.temp_header" > "$DEFS_DIR/metadata.ts"
sed -n "${METADATA_START},${METADATA_END}p" "$SOURCE_FILE" >> "$DEFS_DIR/metadata.ts"
echo -e "${GREEN}✅ Created metadata.ts ($(wc -l < "$DEFS_DIR/metadata.ts") lines)${NC}"

# Taxonomy tools
TAXONOMY_END=$((COMMUNICATION_START - 2))
cat "$DEFS_DIR/.temp_header" > "$DEFS_DIR/taxonomy.ts"
sed -n "${TAXONOMY_START},${TAXONOMY_END}p" "$SOURCE_FILE" >> "$DEFS_DIR/taxonomy.ts"
echo -e "${GREEN}✅ Created taxonomy.ts ($(wc -l < "$DEFS_DIR/taxonomy.ts") lines)${NC}"

# Communication tools
COMMUNICATION_END=$((OTHER_START - 2))
cat "$DEFS_DIR/.temp_header" > "$DEFS_DIR/communication.ts"
sed -n "${COMMUNICATION_START},${COMMUNICATION_END}p" "$SOURCE_FILE" >> "$DEFS_DIR/communication.ts"
echo -e "${GREEN}✅ Created communication.ts ($(wc -l < "$DEFS_DIR/communication.ts") lines)${NC}"

# Other tools (to end of file)
cat "$DEFS_DIR/.temp_header" > "$DEFS_DIR/other.ts"
sed -n "${OTHER_START},\$p" "$SOURCE_FILE" >> "$DEFS_DIR/other.ts"
echo -e "${GREEN}✅ Created other.ts ($(wc -l < "$DEFS_DIR/other.ts") lines)${NC}"

# Clean up temp file
rm "$DEFS_DIR/.temp_header"

# Create index file
echo -e "\n${CYAN}Creating index.ts to aggregate all definitions...${NC}"

cat > "$DEFS_DIR/index.ts" << 'EOF'
/**
 * Tool Definitions Index
 *
 * This file aggregates all tool definitions from category-specific files.
 * Each category is in its own file for better organization and reduced context.
 */

import { accountTools } from './account.js';
import { inventoryTools } from './inventory.js';
import { fulfillmentTools } from './fulfillment.js';
import { marketingTools } from './marketing.js';
import { analyticsTools } from './analytics.js';
import { metadataTools } from './metadata.js';
import { taxonomyTools } from './taxonomy.js';
import { communicationTools } from './communication.js';
import { otherApiTools } from './other.js';

// Export individual categories
export {
  accountTools,
  inventoryTools,
  fulfillmentTools,
  marketingTools,
  analyticsTools,
  metadataTools,
  taxonomyTools,
  communicationTools,
  otherApiTools,
};

// Export all tools as a single array
export const allTools = [
  ...accountTools,
  ...inventoryTools,
  ...fulfillmentTools,
  ...marketingTools,
  ...analyticsTools,
  ...metadataTools,
  ...taxonomyTools,
  ...communicationTools,
  ...otherApiTools,
];

// Export types
export type { ToolDefinition } from './account.js';
EOF

echo -e "${GREEN}✅ Created index.ts${NC}"

echo -e "\n${BLUE}═══════════════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Split complete! 🎉${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}Created files:${NC}"
echo "  • definitions/account.ts"
echo "  • definitions/inventory.ts"
echo "  • definitions/fulfillment.ts"
echo "  • definitions/marketing.ts"
echo "  • definitions/analytics.ts"
echo "  • definitions/metadata.ts"
echo "  • definitions/taxonomy.ts"
echo "  • definitions/communication.ts"
echo "  • definitions/other.ts"
echo "  • definitions/index.ts"
echo ""
echo -e "${CYAN}Next steps:${NC}"
echo "  1. Update imports in src/tools/index.ts"
echo "  2. Run: npm run build"
echo "  3. Run: npm run test"
echo "  4. Remove old tool-definitions.ts"
echo ""
