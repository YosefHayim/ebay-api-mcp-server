import type {
  Charity,
  ExtendedProducerResponsibility,
  ListingPolicies,
  PricingSummary,
  Regulatory,
} from "../post/bulk-create-offer.js";

/**
 * GET /sell/inventory/v1/offer/{offerId}
 *
 * Retrieves details of a specific offer (published or unpublished).
 *
 * - Always requires OAuth access token with scope:
 *   - https://api.ebay.com/oauth/api_scope/sell.inventory.readonly
 *   - or https://api.ebay.com/oauth/api_scope/sell.inventory
 * - Sandbox: swap api.ebay.com with api.sandbox.ebay.com
 * - Request body: none
 * - Success: HTTP 200 + EbayOfferDetailsWithAll
 */

/** Path params for getOffer */
export type GetOfferPathParams = {
  /**
   * Required offerId.
   * The unique identifier of the offer being retrieved.
   * Retrieve via getOffers.
   */
  offerId: string;
};

/** Response: complete details of the offer */
export type GetOfferResponse = {
  /** Quantity available for sale (not always present for unpublished) */
  availableQuantity?: number;
  /** Primary eBay category id (always for published; if set for unpublished) */
  categoryId?: string;
  /** Charity info if donation is configured */
  charity?: Charity;
  /** Extended Producer Responsibility info (eco fees, etc.) */
  extendedProducerResponsibility?: ExtendedProducerResponsibility;
  /** Format: FIXED_PRICE or AUCTION */
  format: "AUCTION" | "FIXED_PRICE";
  /** Private listing flag */
  hideBuyerDetails: boolean;
  /** Whether eBay catalog details are included (default true) */
  includeCatalogProductDetails: boolean;
  /** Listing details (present only if published) */
  listing?: {
    listingId: string;
    listingOnHold?: boolean;
    listingStatus: "ACTIVE" | "OUT_OF_STOCK" | "INACTIVE" | string;
    soldQuantity: number;
  };
  /** Description text (HTML supported; 500k char max) */
  listingDescription?: string;
  /** Duration: e.g. GTC for fixed-price, DAYS_x for auction */
  listingDuration: string;
  /** Listing policies (fulfillment, payment, return, best offer, shipping overrides, etc.) */
  listingPolicies: ListingPolicies;
  /** Optional start date (ISO UTC) for scheduled listings */
  listingStartDate?: string;
  /** Lot size if this is a lot listing */
  lotSize?: number;
  /** Marketplace (e.g. EBAY_US, EBAY_UK, etc.) */
  marketplaceId: string;
  /** Inventory location key if set */
  merchantLocationKey?: string;
  /** The offerId (matches the input path param) */
  offerId: string;
  /** Pricing summary: price, auction start/reserve, strikethrough, MAP, etc. */
  pricingSummary: PricingSummary;
  /** Restrict per-buyer purchase quantity */
  quantityLimitPerBuyer?: number;
  /** Regulatory metadata (documents, energy efficiency, hazmat, manufacturer, etc.) */
  regulatory?: Regulatory;
  /** Secondary category id, if listed under two categories */
  secondaryCategoryId?: string;
  /** Seller-defined SKU (max 50 chars) */
  sku: string;
  /** Offer status: PUBLISHED or UNPUBLISHED */
  status: "PUBLISHED" | "UNPUBLISHED";
  /** eBay Store category paths, if applied */
  storeCategoryNames?: string[];
  /** Tax/VAT info if applied */
  tax?: {
    applyTax?: boolean;
    thirdPartyTaxCategory?: string;
    vatPercentage?: number;
  };
};

/** Error codes that can be returned from getOffer */
export enum GetOfferErrorCode {
  /** System error */
  SYSTEM_ERROR = 25_001,
  /** Invalid field value */
  INVALID_FIELD_VALUE = 25_709,
  /** Offer not available (bad/unknown offerId or invalid state) */
  OFFER_NOT_AVAILABLE = 25_713,
}
