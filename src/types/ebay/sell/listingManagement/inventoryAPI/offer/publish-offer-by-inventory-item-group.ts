import type { EbayMarketplace, ErrorDetailV3 } from "../../inventory-api-global-types.js";
import type { ErrorParameterV3 } from "./bulk-create-offer.js";

/**
 * POST https://api.ebay.com/sell/inventory/v1/offer/publish_by_inventory_item_group
 * (Sandbox: https://api.sandbox.ebay.com/...)
 * Converts all unpublished offers in an inventory item group into an active multiple-variation listing.
 *
 * OAuth scope: https://api.ebay.com/oauth/api_scope/sell.inventory
 */
export type PublishByInventoryItemGroupRequest = {
  /** Unique identifier of the inventory item group (inventoryItemGroupKey). */
  inventoryItemGroupKey: string;

  /** Target marketplace where the listing will be published. */
  marketplaceId: EbayMarketplace;
};

export type PublishResponse = {
  /** Unique identifier of the newly created eBay listing. Returned on success. */
  listingId?: string;

  /** Warnings and/or errors that occurred during publish. */
  warnings?: ErrorDetailV3[];
};

/** HTTP status codes potentially returned by this operation. */
export type PublishByInventoryItemGroupHttpStatus = 200 | 400 | 500;

/** Optional execution parameters for the SDK wrapper. */
export type PublishByInventoryItemGroupOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers (Content-Type will be application/json). */
  headers?: Record<string, string>;
};

/**
 * Publish all unpublished offers in an inventory item group as a multiple-variation listing.
 * Returns listingId on success and any warnings encountered.
 */
export declare function publishOfferByInventoryItemGroup(
  request: PublishByInventoryItemGroupRequest,
  options: PublishByInventoryItemGroupOptions
): Promise<PublishResponse>;

/** Convenience re-export aliases for error shapes. */
export type PublishErrorDetail = ErrorDetailV3;
export type PublishErrorParameter = ErrorParameterV3;
