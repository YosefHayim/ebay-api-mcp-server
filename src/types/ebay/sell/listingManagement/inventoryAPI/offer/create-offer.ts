import type { EbayOfferDetailsWithKeys, ErrorDetailV3 } from "../../inventory-api-global-types.js";

/**
 * Request body for POST /offer (createOffer).
 * Creates a new offer for a specific SKU/marketplace/format.
 *
 * Notes:
 * - Required: sku, marketplaceId, format
 * - Additional fields (location, quantity, price, category, policies)
 *   must be populated before publishOffer is called.
 */
export type CreateOfferRequest = EbayOfferDetailsWithKeys;

/**
 * Response body for POST /offer (createOffer).
 */
export type CreateOfferResponse = {
  /**
   * The unique identifier of the offer just created.
   * Returned only on success (201 Created).
   */
  offerId?: string;

  /**
   * Array of errors/warnings if present.
   * Typically populated when optional fields are invalid
   * or dropped by the API.
   */
  warnings?: ErrorDetailV3[];
};
