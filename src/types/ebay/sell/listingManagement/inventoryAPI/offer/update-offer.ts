import type { ErrorDetailV3, ListingDurationEnum } from "../../inventory-api-global-types.js";
import type {
  Charity,
  ErrorParameterV3,
  ExtendedProducerResponsibility,
  ListingPolicies,
  PricingSummary,
  Regulatory,
} from "../post/bulk-create-offer.js";

/**
 * PUT https://api.ebay.com/sell/inventory/v1/offer/{offerId}
 * (Sandbox: https://api.sandbox.ebay.com/...)
 * Updates an existing offer. Complete replacement — all offer fields must be supplied.
 *
 * OAuth scope: https://api.ebay.com/oauth/api_scope/sell.inventory
 * Required headers: Authorization, Content-Type: application/json, Content-Language
 */

/** Request body for updateOffer */
export type UpdateOfferRequest = {
  /** Quantity available via this offer. For auction, must be 1. */
  availableQuantity?: number;

  /** Primary eBay category ID. Required for published offers and before publishing. */
  categoryId?: string;

  /** Charitable donation settings. */
  charity?: Charity;

  /** EPR (Extended Producer Responsibility) data. */
  extendedProducerResponsibility?: ExtendedProducerResponsibility;

  /** Enable private listing (hide buyer identities). */
  hideBuyerDetails?: boolean;

  /** Apply eBay catalog details. Defaults to true if omitted. */
  includeCatalogProductDetails?: boolean;

  /** Listing description (required for published offers). Max 500000 chars including HTML). */
  listingDescription?: string;

  /** Listing duration (GTC for fixed price; auctions support finite durations). */
  listingDuration?: ListingDurationEnum;

  /**
   * Listing policies and related overrides.
   * Required for updating published offers and before publishing an offer.
   */
  listingPolicies?: ListingPolicies;

  /** Optional scheduled start (UTC ISO-8601). Applies to unpublished offers only. */
  listingStartDate?: string;

  /** Lot size when selling as a lot. */
  lotSize?: number;

  /** Inventory location key. Required before publishing. */
  merchantLocationKey?: string;

  /**
   * Pricing summary including price (required before publishing),
   * MAP/STP where eligible, auction pricing where applicable.
   */
  pricingSummary?: PricingSummary;

  /** Limit max purchasable quantity per buyer. */
  quantityLimitPerBuyer?: number;

  /** Regulatory information (GPSR/EU requirements, hazmat, docs, etc.). */
  regulatory?: Regulatory;

  /** Secondary eBay category ID (fees may apply). */
  secondaryCategoryId?: string;

  /** Up to two Store category paths (e.g., "/Fashion/Men/Shirts"). */
  storeCategoryNames?: string[];

  /** Tax table/VAT/third-party category settings. */
  tax?: {
    applyTax?: boolean;
    thirdPartyTaxCategory?: string;
    vatPercentage?: number;
  };
};

/** Response for updateOffer (204 No Content on success; warnings may be returned with 200). */
export type UpdateOfferResponse = {
  /** Warnings/errors encountered during update. */
  warnings?: ErrorDetailV3[];
};

/** HTTP status codes potentially returned by this operation. */
export type UpdateOfferHttpStatus = 200 | 204 | 400 | 404 | 500;

/** Options for executing updateOffer. */
export type UpdateOfferOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Required natural language of payload values (e.g., "en-US", "de-DE"). */
  contentLanguage: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers. Content-Type will be application/json. */
  headers?: Record<string, string>;
};

/**
 * Update an existing offer by offerId.
 * Complete replacement of the offer object; supply all fields that define the offer.
 * Success usually returns 204 No Content; warnings may be returned with 200.
 */
export declare function updateOffer(
  offerId: string,
  body: UpdateOfferRequest,
  options: UpdateOfferOptions
): Promise<UpdateOfferResponse>;

/** Convenience aliases for error shapes. */
export type UpdateOfferWarning = ErrorDetailV3;
export type UpdateOfferWarningParameter = ErrorParameterV3;
