import type { GetOfferResponse } from "./get-offer.js";

/**
 * GET /sell/inventory/v1/offer
 *
 * Retrieves all existing offers for a given SKU.
 *
 * - Requires OAuth access token with scope:
 *   - https://api.ebay.com/oauth/api_scope/sell.inventory.readonly
 *   - or https://api.ebay.com/oauth/api_scope/sell.inventory
 * - Sandbox: swap api.ebay.com with api.sandbox.ebay.com
 * - Request body: none
 * - Success: HTTP 200 + OffersResponse
 */

/** Query params for getOffers */
export type GetOffersQueryParams = {
  /** Required seller-defined SKU (max length 50). */
  sku: string;
  /** Optional marketplace ID (currently not practically used). */
  marketplace_id?: string;
  /** Optional listing format: FIXED_PRICE | AUCTION */
  format?: "FIXED_PRICE" | "AUCTION";
  /** Max number of results per page (default 100). */
  limit?: number;
  /** Page offset (0-based). */
  offset?: number;
};

/** Response wrapper for getOffers */
export type GetOffersResponse = {
  /** URL to the current page of results */
  href: string;
  /** Max records per page */
  limit: number;
  /** Optional link to next page */
  next?: string;
  /** The offers retrieved for the SKU */
  offers: GetOfferResponse[];
  /** Optional link to previous page */
  prev?: string;
  /** Number of offers in this page */
  size: number;
  /** Total number of offers across all pages */
  total: number;
};
