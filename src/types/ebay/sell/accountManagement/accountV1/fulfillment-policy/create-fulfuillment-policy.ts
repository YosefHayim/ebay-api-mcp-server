import type { ErrorDetailV3 } from "./update-fulfuillment-policy-ts.js";

/**
 * Category group selector for the policy.
 */
export type CategoryType = {
  /**
   * Deprecated. Ignored by create/update.
   * Occurrence: Optional
   */
  default?: boolean;

  /**
   * Category type. Return policies do not support motors, but fulfillment does.
   * Examples: "ALL_EXCLUDING_MOTORS_VEHICLES" | "MOTORS_VEHICLES"
   * Occurrence: Required
   */
  name: string;
};

/**
 * Monetary amount.
 */
export type Amount = {
  /**
   * ISO 4217 currency code (e.g., "USD").
   * Occurrence: Conditional
   */
  currency: string;

  /**
   * Amount as string.
   * Occurrence: Conditional
   */
  value: string;
};

/**
 * Generic time duration container.
 */
export type TimeDuration = {
  /**
   * Time unit (e.g., "DAY").
   * Occurrence: Conditional
   */
  unit: string;

  /**
   * Numeric value for the unit.
   * Occurrence: Conditional
   */
  value: number;
};

/**
 * Named shipping region.
 */
export type Region = {
  /**
   * Region identifier (world region/country code/state/province/special region).
   * Occurrence: Optional
   */
  regionName: string;

  /**
   * Reserved for future use.
   * Occurrence: Optional
   */
  regionType?: string;
};

/**
 * Included/excluded shipping regions.
 */
export type RegionSet = {
  /**
   * Regions to exclude.
   * Occurrence: Optional/Always in responses
   */
  regionExcluded?: Region[];

  /**
   * Regions to include.
   * Occurrence: Conditional/Always in responses
   */
  regionIncluded?: Region[];
};

/**
 * Per-service shipping configuration.
 */
export type ShippingService = {
  /**
   * Additional cost when buyer purchases multiple quantities (<= shippingCost).
   * Occurrence: Conditional
   */
  additionalShippingCost?: Amount;

  /**
   * Motors only: buyer must pick up vehicle.
   * Occurrence: Conditional
   */
  buyerResponsibleForPickup?: boolean;

  /**
   * Motors only: buyer arranges shipping.
   * Occurrence: Conditional
   */
  buyerResponsibleForShipping?: boolean;

  /**
   * Free shipping (first domestic service only).
   * Occurrence: Conditional
   */
  freeShipping?: boolean;

  /**
   * Shipping carrier enum string (e.g., "USPS", "UPS").
   * Occurrence: Conditional
   */
  shippingCarrierCode?: string;

  /**
   * Flat-rate cost for one item (required for flat model unless using rate table).
   * Occurrence: Conditional
   */
  shippingCost?: Amount;

  /**
   * Shipping service enum string (e.g., "USPSPriorityFlatRateBox").
   * Occurrence: Conditional
   */
  shippingServiceCode: string;

  /**
   * Per-service ship-to locations. Prefer includes at this level.
   * Occurrence: Conditional/Always in responses
   */
  shipToLocations?: RegionSet;

  /**
   * Display order. Min 1. Max 4 (DOMESTIC) / 5 (INTERNATIONAL).
   * Occurrence: Optional
   */
  sortOrder?: number;

  /**
   * Deprecated here; use rate tables for surcharges.
   * Occurrence: Optional
   */
  surcharge?: Amount;
};

/**
 * Shipping options group (domestic/international).
 */
export type ShippingOption = {
  /**
   * Cost model: "FLAT_RATE" | "CALCULATED" | "NOT_SPECIFIED".
   * Occurrence: Conditional
   */
  costType?: string;

  /**
   * Deprecated fields; ignored if sent.
   * Occurrence: Optional
   */
  insuranceFee?: Amount;
  insuranceOffered?: boolean;

  /**
   * Option type: "DOMESTIC" | "INTERNATIONAL".
   * Occurrence: Conditional
   */
  optionType?: string;

  /**
   * Handling charges (not allowed for domestic if free shipping).
   * Occurrence: Optional
   */
  packageHandlingCost?: Amount;

  /**
   * Associate shipping rate table ID.
   * Occurrence: Optional
   */
  rateTableId?: string;

  /**
   * Associate shipping discount profile ID.
   * Occurrence: Optional
   */
  shippingDiscountProfileId?: string;

  /**
   * Promotional shipping discount enabled.
   * Occurrence: Optional
   */
  shippingPromotionOffered?: boolean;

  /**
   * One or more shipping services.
   * Occurrence: Conditional
   */
  shippingServices?: ShippingService[];
};

/**
 * Request payload to create a fulfillment policy.
 */
export type FulfillmentPolicyRequest = {
  /**
   * Category group this policy applies to.
   * Occurrence: Required
   */
  categoryTypes: CategoryType[];

  /**
   * Seller-defined internal description (not shown to buyers).
   * Max length: 250
   * Occurrence: Optional
   */
  description?: string;

  /**
   * Enable freight shipping (items > 150 lb).
   * Default: false
   * Occurrence: Optional
   */
  freightShipping?: boolean;

  /**
   * UK only: Global Shipping Program flag.
   * Default: false
   * Occurrence: Optional
   */
  globalShipping?: boolean;

  /**
   * Handling time commitment in business days.
   * Required when any shipping options exist and not freight/local pickup.
   * Occurrence: Conditional
   */
  handlingTime?: TimeDuration;

  /**
   * Offer local pickup.
   * Default: false
   * Occurrence: Optional
   */
  localPickup?: boolean;

  /**
   * Target marketplace ID (e.g., "EBAY_US").
   * Occurrence: Required
   */
  marketplaceId: string;

  /**
   * Seller-defined unique name within a marketplace.
   * Max length: 64
   * Occurrence: Required
   */
  name: string;

  /**
   * Click and Collect (requires eligibility; AU/GB/DE/FR/IT).
   * Default: false
   * Occurrence: Optional
   */
  pickupDropOff?: boolean;

  /**
   * Domestic and/or international shipping options.
   * Occurrence: Conditional
   */
  shippingOptions?: ShippingOption[];

  /**
   * Master include/exclude ship-to regions.
   * Occurrence: Optional/Always in responses
   */
  shipToLocations?: RegionSet;
};

/**
 * Response payload for a created fulfillment policy.
 */
export type SetFulfillmentPolicyResponse = {
  categoryTypes: CategoryType[];
  description?: string;
  freightShipping: boolean;
  fulfillmentPolicyId: string;
  globalShipping: boolean;
  handlingTime?: TimeDuration;
  localPickup: boolean;
  marketplaceId: string;
  name: string;
  pickupDropOff: boolean;
  shippingOptions?: ShippingOption[];
  shipToLocations: RegionSet;
  warnings: ErrorDetailV3[];
};

/**
 * @summary Create Fulfillment Policy
 * @description Creates a fulfillment policy defining shipping options, handling time, and ship-to locations for a marketplace.
 * @method POST
 * @path /sell/account/v1/fulfillment_policy
 * @authentication OAuth access token with scope: https://api.ebay.com/oauth/api_scope/sell.account
 * @headers Content-Type: application/json (Required)
 * @body FulfillmentPolicyRequest
 * @response 201 { "name": "D********g", "marketplaceId": "EBAY_US", "categoryTypes": [ { "name": "ALL_EXCLUDING_MOTORS_VEHICLES" } ], "handlingTime": { "value": 1, "unit": "DAY" }, "shippingOptions": [ { "optionType": "DOMESTIC", "costType": "FLAT_RATE", "shippingServices": [ { "sortOrder": 1, "shippingCarrierCode": "USPS", "shippingServiceCode": "USPSPriorityFlatRateBox", "shippingCost": { "value": "0.0", "currency": "USD" }, "additionalShippingCost": { "value": "0.0", "currency": "USD" }, "freeShipping": true, "buyerResponsibleForShipping": false } ] } ], "fulfillmentPolicyId": "5********0", "freightShipping": false, "globalShipping": false, "localPickup": false, "pickupDropOff": false, "shipToLocations": { "regionIncluded": [ { "regionName": "Worldwide" } ], "regionExcluded": [] }, "warnings": [] }
 * @status 201 Created
 * @status 400 Bad Request
 * @status 500 Internal Server Error
 * @error 20400 API_ACCOUNT REQUEST Invalid request. {additionalInfo}
 * @error 20401 API_ACCOUNT REQUEST Missing field {fieldName}. {additionalInfo}
 * @error 20402 API_ACCOUNT REQUEST Invalid input. {additionalInfo}
 * @error 20403 API_ACCOUNT REQUEST Invalid {fieldName}. {additionalInfo}
 * @error 20500 API_ACCOUNT APPLICATION System error.
 * @error 20501 API_ACCOUNT APPLICATION Service unavailable. Please try again in next 24 hours.
 * @warning 20200 API_ACCOUNT BUSINESS Warning. {additionalInfo}
 * @warning 20201 API_ACCOUNT BUSINESS Click and Collect cannot be enabled for this seller/marketplace.
 */
export type CreateFulfillmentPolicyAPI = {
  method: "POST";
  path: "/sell/account/v1/fulfillment_policy";
  payload: FulfillmentPolicyRequest;
  response: SetFulfillmentPolicyResponse;
};
