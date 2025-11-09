import type { ErrorDetailV3 } from "../inventory-api-global-types.js";

/** Request body */
export type BulkMigrateListingRequest = {
  requests: {
    /** Trading API ItemID of the listing to migrate (1–5 per call). */
    listingId: string;
  }[];
};

/** Response body */
export type BulkMigrateListingResponse = {
  responses: MigrateListingResponse[];
};

export type MigrateListingResponse = {
  /** HTTP status for this listing's migration attempt */
  statusCode: number;
  /** The eBay ItemID that was attempted */
  listingId?: string;
  /** Marketplace identifier, e.g., EBAY_US */
  marketplaceId?: string;
  /** Present for successfully migrated multi-variation listings */
  inventoryItemGroupKey?: string;
  /** SKUs (always) and Offer IDs (on success) produced by migration */
  inventoryItems: {
    sku: string;
    offerId?: string;
  }[];
  /** Errors (if any) for this listing */
  errors?: ErrorDetailV3[];
  /** Warnings (if any) for this listing */
  warnings?: ErrorDetailV3[];
};
