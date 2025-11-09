/**
 * GET /sell/account/v1/fulfillment_policy
 * Retrieves all fulfillment policies for a given marketplace.
 * No request body.
 */

export type MarketplaceIdEnum =
  | "EBAY_US"
  | "EBAY_GB"
  | "EBAY_DE"
  | "EBAY_AU"
  | "EBAY_CA"
  | "EBAY_FR"
  | "EBAY_IT"
  | "EBAY_ES"
  | "EBAY_AT"
  | "EBAY_BE"
  | "EBAY_CH"
  | "EBAY_IE"
  | "EBAY_NL"
  | "EBAY_PL"
  | "EBAY_SG"
  | "EBAY_HK"
  | "EBAY_MY"
  | "EBAY_PH"
  | "EBAY_TW"
  | "EBAY_MOTORS"
  | (string & {}); // allow forward-compat

export type TimeDurationUnitEnum = "YEAR" | "MONTH" | "DAY" | "HOUR" | "CALENDAR_DAY" | (string & {});
export type ShippingCostTypeEnum = "CALCULATED" | "FLAT_RATE" | "NOT_SPECIFIED" | (string & {});
export type ShippingOptionTypeEnum = "DOMESTIC" | "INTERNATIONAL" | (string & {});
export type RegionTypeEnum = "COUNTRY" | "COUNTRY_REGION" | "STATE_OR_PROVINCE" | "WORLDWIDE" | (string & {});
export type CategoryTypeEnum = "MOTORS_VEHICLES" | "ALL_EXCLUDING_MOTORS_VEHICLES";

/** Common primitives */
export type Amount = { currency: string; value: string };
export type TimeDuration = { unit: TimeDurationUnitEnum; value: number };

export type CategoryType = {
  /** @deprecated not used in create/update; may appear in GET payloads */
  default?: boolean;
  name: CategoryTypeEnum;
};

export type Region = {
  regionName: string; // e.g. "Worldwide", "US", "CA-ON"
  regionType?: RegionTypeEnum;
};

export type RegionSet = {
  regionIncluded?: Region[];
  regionExcluded?: Region[];
};

export type ShippingService = {
  shippingServiceCode: string; // e.g. "USPSPriorityFlatRateBox"
  shippingCarrierCode?: string; // e.g. "USPS"
  sortOrder?: number; // 1..4 (domestic) or 1..5 (intl)
  freeShipping?: boolean; // only valid for first domestic service
  buyerResponsibleForShipping?: boolean;
  buyerResponsibleForPickup?: boolean; // motors
  shippingCost?: Amount; // required for FLAT_RATE if no rate table
  additionalShippingCost?: Amount; // for multi-qty discounts
  surcharge?: Amount; // DEPRECATED: use rate tables (domestic only)
  shipToLocations?: RegionSet; // prefer includes at service-level; excludes top-level
};

export type ShippingOption = {
  optionType: ShippingOptionTypeEnum; // DOMESTIC or INTERNATIONAL
  costType: ShippingCostTypeEnum; // FLAT_RATE or CALCULATED
  rateTableId?: string; // link to rate table
  packageHandlingCost?: Amount;
  shippingDiscountProfileId?: string;
  shippingPromotionOffered?: boolean;
  /** @deprecated insurance fields no longer supported */
  insuranceOffered?: boolean;
  insuranceFee?: Amount;
  shippingServices?: ShippingService[];
};

export type FulfillmentPolicy = {
  fulfillmentPolicyId: string;
  name: string; // unique per marketplace
  description?: string; // seller-facing only
  marketplaceId: MarketplaceIdEnum;
  categoryTypes: CategoryType[];
  handlingTime?: TimeDuration; // business days; not for local/freight-only
  localPickup: boolean;
  pickupDropOff: boolean; // Click & Collect (eligible markets only)
  freightShipping: boolean; // >150 lbs
  globalShipping: boolean; // EBAY_GB only (GSP); EIS is account-level
  shippingOptions?: ShippingOption[]; // domestic/international options
  shipToLocations?: RegionSet; // master include/exclude set
};

export type FulfillmentPolicyResponse = {
  total: number;
  fulfillmentPolicies: FulfillmentPolicy[];
  // Pagination placeholders (forwards-compat; may be empty)
  href?: string;
  limit?: number;
  next?: string;
  offset?: number;
  prev?: string;
};

/** Query & headers */
export type GetFulfillmentPoliciesQuery = {
  /**
   * eBay marketplace whose policies to retrieve.
   * Occurrence: Required
   */
  marketplace_id: MarketplaceIdEnum;
};

export type GetFulfillmentPoliciesHeaders = {
  /**
   * Locale override for multi-locale marketplaces (e.g., "fr-CA", "nl-BE").
   * Occurrence: Conditional
   */
  "Content-Language"?: string;
};

/**
 * @summary Get Fulfillment Policies
 * @description Retrieves all fulfillment policies for the specified marketplace.
 * @method GET
 * @path /sell/account/v1/fulfillment_policy
 * @authentication OAuth access token with scope:
 *  - https://api.ebay.com/oauth/api_scope/sell.account
 *  - or https://api.ebay.com/oauth/api_scope/sell.account.readonly
 * @headers Authorization: Bearer <token> (required)
 * @headers Content-Language (optional, conditional for multi-locale sites)
 * @query marketplace_id (required)
 * @response 200 Success with FulfillmentPolicyResponse
 * @status 200 Success
 * @status 400 Bad Request
 * @status 500 Internal Server Error
 * @errors
 *  - 20401 API_ACCOUNT REQUEST: Missing field {fieldName}. {additionalInfo}
 *  - 20403 API_ACCOUNT REQUEST: Invalid {fieldName}. {additionalInfo}
 *  - 20404 API_ACCOUNT REQUEST: {fieldName} not found.
 *  - 20500 API_ACCOUNT APPLICATION: System error.
 *  - 20501 API_ACCOUNT APPLICATION: Service unavailable. Please try again in next 24 hours.
 */
export type GetFulfillmentPoliciesAPI = {
  method: "GET";
  path: "/sell/account/v1/fulfillment_policy";
  query: GetFulfillmentPoliciesQuery;
  headers?: GetFulfillmentPoliciesHeaders;
  // No request payload
  payload: undefined;
  // 200 OK
  response: FulfillmentPolicyResponse;
};
