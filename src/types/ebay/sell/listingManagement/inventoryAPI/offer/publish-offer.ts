import type { ErrorDetailV3 } from "../../inventory-api-global-types.js";
import type { ErrorParameterV3 } from "./bulk-create-offer.js";

/**
 * POST https://api.ebay.com/sell/inventory/v1/offer/{offerId}/publish
 * (Sandbox: https://api.sandbox.ebay.com/...)
 * Converts an unpublished offer into a live eBay listing.
 *
 * OAuth scope: https://api.ebay.com/oauth/api_scope/sell.inventory
 * Request body: none
 */
export type PublishResponse = {
  /** Newly created eBay listing ID (Item ID) when publish succeeds. */
  listingId?: string;

  /** Warnings and/or errors returned by the API. */
  warnings?: ErrorDetailV3[];
};

/** HTTP status codes potentially returned by this operation. */
export type PublishOfferHttpStatus = 200 | 400 | 404 | 500;

/** Options for executing publishOffer. */
export type PublishOfferOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers. */
  headers?: Record<string, string>;
};

/**
 * Publish a single offer by offerId.
 * Returns listingId on success and any warnings encountered.
 */
export declare function publishOffer(offerId: string, options: PublishOfferOptions): Promise<PublishResponse>;

/** Convenience aliases for error shapes. */
export type PublishOfferWarning = ErrorDetailV3;
export type PublishOfferWarningParameter = ErrorParameterV3;
