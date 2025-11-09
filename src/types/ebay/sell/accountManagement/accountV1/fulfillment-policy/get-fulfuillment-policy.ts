/**
 * GET /sell/account/v1/fulfillment_policy/{fulfillmentPolicyId}
 * Retrieves a single fulfillment policy by its ID.
 * No request body.
 */

/* ===== Enums & common types ===== */
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
  | (string & {});

export type TimeDurationUnitEnum = "YEAR" | "MONTH" | "DAY" | "HOUR" | "CALENDAR_DAY" | (string & {});
export type ShippingCostTypeEnum = "CALCULATED" | "FLAT_RATE" | "NOT_SPECIFIED" | (string & {});
export type ShippingOptionTypeEnum = "DOMESTIC" | "INTERNATIONAL" | (string & {});
export type RegionTypeEnum = "COUNTRY" | "COUNTRY_REGION" | "STATE_OR_PROVINCE" | "WORLDWIDE" | (string & {});
export type CategoryTypeEnum = "MOTORS_VEHICLES" | "ALL_EXCLUDING_MOTORS_VEHICLES";

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
  surcharge?: Amount; // deprecated (use rate tables)
  shipToLocations?: RegionSet; // prefer includes; excludes at policy level
};

export type ShippingOption = {
  optionType: ShippingOptionTypeEnum; // DOMESTIC or INTERNATIONAL
  costType: ShippingCostTypeEnum; // FLAT_RATE or CALCULATED
  rateTableId?: string;
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
  globalShipping: boolean; // EBAY_GB (GSP); EIS is account-level
  shippingOptions?: ShippingOption[]; // domestic/international options
  shipToLocations?: RegionSet; // master include/exclude set
};

/* ===== Path params & headers ===== */
export type GetFulfillmentPolicyPath = {
  /** ID of the fulfillment policy to retrieve. Required. */
  fulfillmentPolicyId: string;
};

export type GetFulfillmentPolicyHeaders = {
  /** OAuth token */
  Authorization: `Bearer ${string}`;
  /** Other standard headers allowed */
  [header: string]: string;
};

/* ===== API shape ===== */
/**
 * @summary Get Fulfillment Policy by ID
 * @description Retrieves full details for a single fulfillment policy.
 * @method GET
 * @path /sell/account/v1/fulfillment_policy/{fulfillmentPolicyId}
 * @scopes
 *  - https://api.ebay.com/oauth/api_scope/sell.account
 *  - or https://api.ebay.com/oauth/api_scope/sell.account.readonly
 * @responses
 *  - 200 Success → FulfillmentPolicy
 *  - 400 Bad Request
 *  - 404 Not Found
 *  - 500 Internal Server Error
 * @errors
 *  - 20403 API_ACCOUNT REQUEST: Missing/Invalid {fieldName}. {additionalInfo}
 *  - 20404 API_ACCOUNT REQUEST: {fieldName} not found.
 *  - 20500 API_ACCOUNT APPLICATION: System error.
 *  - 20501 API_ACCOUNT APPLICATION: Service unavailable. Please try again in next 24 hours.
 */
export type GetFulfillmentPolicyAPI = {
  method: "GET";
  path: "/sell/account/v1/fulfillment_policy/{fulfillmentPolicyId}";
  pathParams: GetFulfillmentPolicyPath;
  headers?: Partial<GetFulfillmentPolicyHeaders>;
  payload: undefined; // no request body
  response: FulfillmentPolicy; // 200 OK
};
