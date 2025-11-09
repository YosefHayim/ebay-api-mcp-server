/**
 * GET /sell/account/v1/fulfillment_policy/get_by_policy_name
 * Retrieves one fulfillment policy by its seller-defined name and marketplace.
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
  regionType?: RegionTypeEnum; // reserved/future use
};

export type RegionSet = {
  regionIncluded?: Region[];
  regionExcluded?: Region[];
};

export type ShippingService = {
  shippingServiceCode: string; // e.g. "USPSPriorityFlatRateBox" (required when present)
  shippingCarrierCode?: string; // e.g. "USPS"
  sortOrder?: number; // 1..4 (domestic) or 1..5 (intl)
  freeShipping?: boolean; // only valid for first domestic service
  buyerResponsibleForShipping?: boolean;
  buyerResponsibleForPickup?: boolean; // motors
  shippingCost?: Amount; // FLAT_RATE if no rate table
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
  shippingServices?: ShippingService[]; // up to 4 domestic / 5 intl
};

/* ===== Response model ===== */
export type FulfillmentPolicy = {
  fulfillmentPolicyId: string;
  marketplaceId: MarketplaceIdEnum;
  name: string;
  description?: string;
  categoryTypes: CategoryType[];
  handlingTime?: TimeDuration; // may be absent if only local pickup or freight
  localPickup: boolean;
  pickupDropOff: boolean; // Click & Collect (eligible markets only)
  freightShipping: boolean;
  /** EBAY_GB only; EIS is account-level and not controlled here */
  globalShipping: boolean;

  shippingOptions?: ShippingOption[];
  shipToLocations?: RegionSet; // master include/exclude set
};

/* ===== Query params & headers ===== */
export type GetFulfillmentPolicyByNameQuery = {
  /** eBay marketplace of the policy to retrieve (required) */
  marketplace_id: MarketplaceIdEnum;
  /** Seller-defined policy name (required, unique per marketplace) */
  name: string;
};

export type GetFulfillmentPolicyByNameHeaders = {
  /** OAuth access token */
  Authorization: `Bearer ${string}`;
  /** Optional: specify locale for multi-locale marketplaces (e.g., "fr-CA", "nl-BE") */
  "Content-Language"?: string;
  [header: string]: string | undefined;
};

/* ===== API shape ===== */
/**
 * @summary Get Fulfillment Policy by Name
 * @method GET
 * @path /sell/account/v1/fulfillment_policy/get_by_policy_name
 * @query marketplace_id, name
 * @scopes
 *  - https://api.ebay.com/oauth/api_scope/sell.account
 *  - https://api.ebay.com/oauth/api_scope/sell.account.readonly
 * @responses
 *  - 200 Success → FulfillmentPolicy
 *  - 400 Bad Request
 *  - 500 Internal Server Error
 * @errors
 *  - 20401 Missing field {fieldName}
 *  - 20403 Invalid {fieldName}
 *  - 20404 {fieldName} not found
 *  - 20500 System error
 *  - 20501 Service unavailable
 */
export type GetFulfillmentPolicyByNameAPI = {
  method: "GET";
  path: "/sell/account/v1/fulfillment_policy/get_by_policy_name";
  query: GetFulfillmentPolicyByNameQuery;
  headers: GetFulfillmentPolicyByNameHeaders;
  response: FulfillmentPolicy; // 200
};

/* ===== Base URLs ===== */
// Production: https://api.ebay.com
// Sandbox:    https://api.sandbox.ebay.com
