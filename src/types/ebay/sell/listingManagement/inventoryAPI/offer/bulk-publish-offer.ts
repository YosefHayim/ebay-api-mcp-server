import type { ErrorDetailV3 } from "../../inventory-api-global-types.js";

/**
 * Bulk request body for /bulk_publish_offer.
 * Publishes up to 25 *unpublished* offers into live eBay listings.
 *
 * Notes:
 * - Each listing can be revised up to 250 times per calendar day.
 * - Fields that were optional/conditional during create/update
 *   must already satisfy “required before publish” rules or publish will fail.
 */
export type BulkPublishOfferRequest = {
  /**
   * Array of offers to publish (max 25).
   * Required by the API.
   */
  requests: OfferKeyWithId[];
};

/**
 * Identifies an unpublished offer to publish.
 */
export type OfferKeyWithId = {
  /**
   * The offerId of an *unpublished* offer to publish.
   * Required. Errors occur if the offer is already live.
   */
  offerId: string;
};

/**
 * Bulk response body for /bulk_publish_offer.
 * Contains one result node per requested offerId.
 */
export type BulkPublishOfferResponse = {
  /**
   * Per-offer publish results. Always returned.
   */
  responses: OfferResponseWithListingId[];
};

/**
 * Per-offer publish result.
 */
export type OfferResponseWithListingId = {
  /**
   * HTTP-like status code for this publish attempt.
   * 200 = success; 207/400/500 indicate partial/multi-status, bad request, or server error.
   * Always returned.
   */
  statusCode: number;

  /**
   * The offerId that was published (or attempted).
   * Always returned.
   */
  offerId: string;

  /**
   * The newly created eBay listing ID (a.k.a. Item ID) if publish succeeded.
   * Returned on success only.
   */
  listingId?: string;

  /**
   * Errors encountered while publishing this offer (if any).
   * Returned when errors occur.
   *
   * Common error families include:
   * - Invalid price/quantity/category/policies/tax/location/images
   * - Missing required fields for the category/marketplace
   * - Inventory Item Group / variation constraints
   * - Regulatory/GPSR/Hazmat/Product Safety validation
   * - Selling limits exceeded
   * - Attempting to publish a SKU that’s part of a variation group via this endpoint
   */
  errors?: ErrorDetailV3[];

  /**
   * Warnings encountered while publishing this offer (if any).
   * Returned when warnings occur (publish may still succeed).
   *
   * Examples:
   * - Non-applicable fields dropped
   * - Invalid options removed
   * - Auto-adjusted P&A return policy requirements
   * - listingStartDate in the past (not updated)
   */
  warnings?: ErrorDetailV3[];
};
