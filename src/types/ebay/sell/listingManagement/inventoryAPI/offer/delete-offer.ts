import type { ErrorDetailV3 } from "../../inventory-api-global-types.js";

/**
 *
 * Permanently deletes an offer.
 *
 * - If the offer is **unpublished**: the offer record is deleted.
 * - If the offer is **published** (live listing):
 *    - Single-variation listing: ends the listing.
 *    - Multi-variation listing: removes that variation and detaches it from the inventory item group.
 *      If the variation has one or more sales, it will NOT be removed; set available qty to 0 instead,
 *      and remove it from the group later.
 */

/** Path params for deleteOffer */
export type DeleteOfferPathParams = {
  /**
   * offerId (required)
   * The unique identifier of the offer being deleted.
   * Retrieve via getOffers.
   */
  offerId: string;
};

/** No request body is sent for deleteOffer */
export type DeleteOfferRequestBody = never;

/**
 * deleteOffer returns no payload on success (HTTP 204).
 * If you surface transport-layer metadata, you can model it here;
 * otherwise treat success as `undefined`.
 */
export type DeleteOfferSuccess = undefined;

/** Error codes you may see from deleteOffer */
export enum DeleteOfferErrorCode {
  /** 25001 API_INVENTORY / APPLICATION – system error */
  SYSTEM_ERROR = 25_001,
  /** 25713 API_INVENTORY / REQUEST – offer is not available (e.g., bad/unknown offerId or invalid state) */
  OFFER_NOT_AVAILABLE = 25_713,
}

/** Canonical error shape (from docs) */
export type DeleteOfferError = {
  /** HTTP status (400, 404, 500). 204 means success (no content). */
  status: 400 | 404 | 500;
  /** One or more structured errors describing the failure. */
  errors: ErrorDetailV3[];
};
