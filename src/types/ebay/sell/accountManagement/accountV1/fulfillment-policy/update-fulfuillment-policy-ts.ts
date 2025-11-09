/**
 * PUT /sell/account/v1/fulfillment_policy/{fulfillmentPolicyId}
 * Updates an existing fulfillment policy. You must send a COMPLETE policy payload;
 * the existing policy is overwritten with the body you provide.
 */

/* ===== Enums & common types (shared) ===== */
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
  shippingServiceCode: string; // e.g. "USPSPriorityFlatRateBox" (required per service)
  shippingCarrierCode?: string; // e.g. "USPS"
  sortOrder?: number; // 1..4 (domestic) or 1..5 (intl)
  freeShipping?: boolean; // only valid for first domestic service
  buyerResponsibleForShipping?: boolean;
  buyerResponsibleForPickup?: boolean; // motors
  shippingCost?: Amount; // needed for FLAT_RATE if no rate table
  additionalShippingCost?: Amount; // multi-qty discount
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

/* ===== Request/Response types ===== */
export type FulfillmentPolicyRequest = {
  /** Required: which categories this policy targets (motors vs not). */
  categoryTypes: CategoryType[];
  /** Required: marketplace this policy belongs to. */
  marketplaceId: MarketplaceIdEnum;
  /** Required: unique name within marketplace. */
  name: string;

  description?: string;
  handlingTime?: TimeDuration; // required if any shippingOptions present
  localPickup?: boolean; // default false
  pickupDropOff?: boolean; // Click & Collect (eligible markets only)
  freightShipping?: boolean; // default false
  /** Only applicable to EBAY_GB (GSP); EIS is account-level and not set here. */
  globalShipping?: boolean;

  shippingOptions?: ShippingOption[]; // conditional; domestic/international blocks
  shipToLocations?: RegionSet; // master include/exclude set
};

export type SetFulfillmentPolicyResponse = {
  fulfillmentPolicyId: string;
  marketplaceId: MarketplaceIdEnum;
  name: string;
  description?: string;
  categoryTypes: CategoryType[];
  handlingTime?: TimeDuration;
  localPickup: boolean;
  pickupDropOff: boolean;
  freightShipping: boolean;
  globalShipping: boolean;
  shippingOptions?: ShippingOption[];
  shipToLocations?: RegionSet;

  /** Warnings/errors encountered during processing (non-fatal). */
  warnings?: ErrorDetailV3[];
};

export type ErrorParameterV3 = { name: string; value: string };
export type ErrorDetailV3 = {
  category?: "Application" | "Business" | "Request" | string;
  domain?: string;
  errorId?: number;
  inputRefIds?: string[];
  longMessage?: string;
  message?: string;
  outputRefIds?: string[];
  parameters?: ErrorParameterV3[];
  subdomain?: string;
};

/* ===== Path params & headers ===== */
export type UpdateFulfillmentPolicyPath = {
  /** ID of the fulfillment policy to update. Required. */
  fulfillmentPolicyId: string;
};

export type UpdateFulfillmentPolicyHeaders = {
  /** OAuth token */
  Authorization: `Bearer ${string}`;
  /** Body content type */
  "Content-Type": "application/json";
  /** Other standard headers allowed */
  [header: string]: string;
};

/* ===== API shape ===== */
/**
 * @summary Update Fulfillment Policy
 * @description Overwrites an existing policy with the supplied FULL policy payload.
 * @method PUT
 * @path /sell/account/v1/fulfillment_policy/{fulfillmentPolicyId}
 * @scopes
 *  - https://api.ebay.com/oauth/api_scope/sell.account
 * @responses
 *  - 200 OK → SetFulfillmentPolicyResponse
 *  - 400 Bad Request
 *  - 404 Not Found
 *  - 500 Internal Server Error
 * @errors
 *  - 20400 Invalid request
 *  - 20401 Missing field {fieldName}
 *  - 20402 Invalid input
 *  - 20403 Invalid {fieldName}
 *  - 20404 {fieldName} not found
 *  - 20500 System error
 *  - 20501 Service unavailable
 * @warnings
 *  - 20200 Business warning
 *  - 20201 Click and Collect cannot be enabled for this seller/marketplace
 */
export type UpdateFulfillmentPolicyAPI = {
  method: "PUT";
  path: "/sell/account/v1/fulfillment_policy/{fulfillmentPolicyId}";
  pathParams: UpdateFulfillmentPolicyPath;
  headers: UpdateFulfillmentPolicyHeaders;
  payload: FulfillmentPolicyRequest;
  response: SetFulfillmentPolicyResponse; // 200 OK
};

/* ===== Helper: Sandbox base ===== */
// Production: https://api.ebay.com
// Sandbox:    https://api.sandbox.ebay.com
