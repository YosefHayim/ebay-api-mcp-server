import type { ErrorDetailV3 } from "../../inventory-api-global-types.js";
import type { ErrorParameterV3 } from "./bulk-create-offer.js";

/**
 * POST https://api.ebay.com/sell/inventory/v1/offer/{offerId}/withdraw
 * (Sandbox: https://api.sandbox.ebay.com/...)
 * Ends the single-variation listing for the specified offer.
 * The Offer remains but reverts to unpublished; use publishOffer to relist.
 *
 * OAuth scope: https://api.ebay.com/oauth/api_scope/sell.inventory
 */

/** Response payload for withdrawOffer */
export type WithdrawOfferResponse = {
  /** Listing ID that was ended. Returned only if the listing ended successfully. */
  listingId?: string;

  /** Any warnings or errors encountered. */
  warnings?: ErrorDetailV3[];
};

/** HTTP status codes potentially returned by this operation. */
export type WithdrawOfferHttpStatus = 200 | 400 | 404 | 500;

/** Options for executing withdrawOffer. */
export type WithdrawOfferOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers (Content-Type not required; no request body). */
  headers?: Record<string, string>;
};

/**
 * Withdraw (end) the eBay listing associated with an offer.
 * The offer object is retained in unpublished state.
 */
export declare function withdrawOffer(offerId: string, options: WithdrawOfferOptions): Promise<WithdrawOfferResponse>;

/** Convenience aliases for error shapes. */
export type WithdrawOfferWarning = ErrorDetailV3;
export type WithdrawOfferWarningParameter = ErrorParameterV3;
