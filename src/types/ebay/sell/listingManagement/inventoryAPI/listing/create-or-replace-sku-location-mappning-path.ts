import type { ErrorDetailV3 } from "../../inventory-api-global-types.js";

/** Path params */
export type CreateOrReplaceSkuLocationMappingPath = {
  /** eBay listing ID (Item ID) */
  listingId: string;
  /** Seller-defined SKU present in the listing */
  sku: string;
};

/** Request body */
export type SkuLocationMappingRequest = {
  locations: LocationAvailabilityDetails[];
};

export type LocationAvailabilityDetails = {
  /** Must reference a location with locationTypes including FULFILLMENT_CENTER */
  merchantLocationKey: string;
};

/** Response
 * 204 No Content on success; errors return standard problem details.
 */
export type CreateOrReplaceSkuLocationMappingResponse = undefined;

/** Possible error payload (non-2xx) */
export type CreateOrReplaceSkuLocationMappingError = {
  errors?: ErrorDetailV3[];
};
