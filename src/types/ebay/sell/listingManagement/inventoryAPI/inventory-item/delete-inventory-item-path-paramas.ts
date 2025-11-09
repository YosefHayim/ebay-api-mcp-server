/**
 * Path parameters for deleteInventoryItem.
 * sku: Seller-defined SKU (unique per seller). Max length: 50
 * Occurrence: Required
 */
export type DeleteInventoryItemPathParams = {
  sku: string;
};

/**
 * Response body for deleteInventoryItem.
 * Successful DELETE returns no payload (HTTP 204).
 */
export type DeleteInventoryItemResponse = Record<string, never>;
