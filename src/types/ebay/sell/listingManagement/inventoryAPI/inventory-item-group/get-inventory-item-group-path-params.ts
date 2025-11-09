/**
 * Path parameters for getInventoryItemGroup.
 * inventoryItemGroupKey: Seller-defined unique identifier. Max length: 50
 * Occurrence: Required
 */
export type GetInventoryItemGroupPathParams = {
  inventoryItemGroupKey: string;
};

/**
 * Request body for getInventoryItemGroup.
 * This call has no payload.
 */
export type GetInventoryItemGroupRequest = undefined;

/**
 * Response body for getInventoryItemGroup.
 */
export type GetInventoryItemGroupResponse = {
  aspects?: Record<string, string[]>;
  description?: string;
  imageUrls?: string[];
  inventoryItemGroupKey: string;
  subtitle?: string;
  title?: string;
  variantSKUs: string[];
  variesBy?: {
    aspectsImageVariesBy?: string[];
    specifications?: {
      name: string;
      values: string[];
    }[];
  };
  videoIds?: string[];
};
