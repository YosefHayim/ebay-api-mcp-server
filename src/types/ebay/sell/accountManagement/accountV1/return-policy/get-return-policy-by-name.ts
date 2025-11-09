/**
 * Query parameters for retrieving a return policy by name.
 */
export type GetReturnPolicyByNameQuery = {
  /**
   * ID of the eBay marketplace (e.g., "EBAY_US").
   * Occurrence: Required
   */
  marketplace_id: string;

  /**
   * Seller-defined name of the return policy to retrieve.
   * Occurrence: Required
   */
  name: string;
};

/**
 * Category group selector for the policy.
 */
export type CategoryType = {
  /**
   * Deprecated. Ignored by create/update; may appear in GET.
   * Occurrence: Conditional
   */
  default?: boolean;

  /**
   * The category type (return policies are non-motors only).
   * Example: "ALL_EXCLUDING_MOTORS_VEHICLES"
   * Occurrence: Always
   */
  name: string;
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
 * International return policy override.
 */
export type InternationalReturnOverrideType = {
  /**
   * Replacement flow offered to the buyer.
   * Occurrence: Conditional
   */
  returnMethod?: string;

  /**
   * International return period.
   * Required if internationalOverride.returnsAccepted = true
   * Occurrence: Conditional
   */
  returnPeriod?: TimeDuration;

  /**
   * Whether international returns are accepted.
   * Occurrence: Conditional
   */
  returnsAccepted?: boolean;

  /**
   * Who pays return shipping for international returns ("BUYER" | "SELLER").
   * Required if internationalOverride.returnsAccepted = true
   * Occurrence: Conditional
   */
  returnShippingCostPayer?: string;
};

/**
 * Single return policy entity.
 */
export type ReturnPolicy = {
  /**
   * Always "ALL_EXCLUDING_MOTORS_VEHICLES" for return policies.
   * Occurrence: Always
   */
  categoryTypes: CategoryType[];

  /**
   * Seller-defined internal description (not shown to buyers).
   * Max length: 250
   * Occurrence: Conditional
   */
  description?: string;

  /**
   * Deprecated. Extended holiday returns are not supported.
   * Occurrence: Conditional
   */
  extendedHolidayReturnsOffered?: boolean;

  /**
   * Separate international return policy, if defined.
   * Occurrence: Conditional
   */
  internationalOverride?: InternationalReturnOverrideType;

  /**
   * Target marketplace ID.
   * Occurrence: Always
   */
  marketplaceId: string;

  /**
   * Seller-defined unique name within a marketplace.
   * Max length: 64
   * Occurrence: Always
   */
  name: string;

  /**
   * Refund method ("MONEY_BACK" or "MERCHANDISE_CREDIT" where applicable).
   * Occurrence: Always
   */
  refundMethod: string;

  /**
   * Deprecated. Restocking fees not allowed.
   * Occurrence: Conditional
   */
  restockingFeePercentage?: string;

  /**
   * Additional seller return instructions (support varies).
   * Max length: 5000 (8000 for DE)
   * Occurrence: Conditional
   */
  returnInstructions?: string;

  /**
   * Replacement item offered as alternative to money back.
   * Occurrence: Conditional
   */
  returnMethod?: string;

  /**
   * Domestic return period (applies internationally unless overridden).
   * Occurrence: Conditional
   */
  returnPeriod?: TimeDuration;

  /**
   * eBay-assigned unique ID of the policy.
   * Occurrence: Always
   */
  returnPolicyId: string;

  /**
   * Whether returns are accepted.
   * Occurrence: Always
   */
  returnsAccepted: boolean;

  /**
   * Who pays return shipping ("BUYER" | "SELLER").
   * Occurrence: Conditional
   */
  returnShippingCostPayer?: string;
};

/**
 * @summary Get Return Policy by Name
 * @description Retrieves the details of a specific return policy by its seller-defined name and marketplace_id.
 * @method GET
 * @path /sell/account/v1/return_policy/get_by_policy_name
 * @authentication OAuth access token with scope: https://api.ebay.com/oauth/api_scope/sell.account or https://api.ebay.com/oauth/api_scope/sell.account.readonly
 * @headers Content-Language: <locale> (Conditional; for marketplaces with multiple locales)
 * @query marketplace_id=MarketplaceIdEnum (Required), name=string (Required)
 * @response 200 { "name": "m********e", "marketplaceId": "EBAY_US", "categoryTypes": [ { "name": "ALL_EXCLUDING_MOTORS_VEHICLES" } ], "returnsAccepted": true, "returnPeriod": { "value": 30, "unit": "DAY" }, "refundMethod": "MONEY_BACK", "returnShippingCostPayer": "SELLER", "returnPolicyId": "5********0" }
 * @status 200 Success
 * @status 400 Bad Request
 * @status 500 Internal Server Error
 * @error 20401 API_ACCOUNT REQUEST Missing field {fieldName}. {additionalInfo}
 * @error 20403 API_ACCOUNT REQUEST Invalid {fieldName}. {additionalInfo}
 * @error 20404 API_ACCOUNT REQUEST {fieldName} not found.
 * @error 20500 API_ACCOUNT APPLICATION System error.
 * @error 20501 API_ACCOUNT APPLICATION Service unavailable. Please try again in next 24 hours.
 */
export type GetReturnPolicyByNameAPI = {
  method: "GET";
  path: "/sell/account/v1/return_policy/get_by_policy_name";
  query: GetReturnPolicyByNameQuery;
  response: ReturnPolicy;
};
