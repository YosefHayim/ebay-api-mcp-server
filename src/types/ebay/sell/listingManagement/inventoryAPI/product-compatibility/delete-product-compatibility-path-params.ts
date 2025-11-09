/**
 * Path parameters for deleteProductCompatibility.
 * sku: Seller-defined SKU associated with the compatibility list. Max length: 50
 * Occurrence: Required
 */
export type DeleteProductCompatibilityPathParams = {
  sku: string;
};

/**
 * Response body for deleteProductCompatibility.
 * Successful DELETE returns no payload (HTTP 204).
 */
export type DeleteProductCompatibilityResponse = Record<string, never>;
