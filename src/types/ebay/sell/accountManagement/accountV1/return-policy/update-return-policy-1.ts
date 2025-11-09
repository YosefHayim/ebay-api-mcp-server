import type { ErrorDetailV3 } from "@/types/ebay/sell/listing-management/inventory-api/inventory-api-global-types";

/**
 * Path parameter for update operation.
 */
export type UpdateReturnPolicyParams = {
  /**
   * Unique identifier of the return policy to update.
   * Occurrence: Required
   */
  return_policy_id: string;
};

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
   * The category type (non-motors only for return policies).
   * Example: "ALL_EXCLUDING_MOTORS_VEHICLES"
   * Occurrence: Required
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
   * Occurrence: Optional
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
   * Required if providing an international override.
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
 * Request payload to update a return policy (full resource overwrite).
 */
export type ReturnPolicyRequest = {
  /**
   * Category group this policy applies to.
   * Must be ALL_EXCLUDING_MOTORS_VEHICLES for return policies.
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
   * Deprecated. Extended holiday returns are no longer supported.
   * Occurrence: Optional
   */
  extendedHolidayReturnsOffered?: boolean;

  /**
   * Separate international return policy.
   * Occurrence: Optional
   */
  internationalOverride?: InternationalReturnOverrideType;

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
   * Refund method ("MONEY_BACK" default; or "MERCHANDISE_CREDIT" where supported).
   * Occurrence: Optional
   */
  refundMethod?: string;

  /**
   * Deprecated. Restocking fees are no longer allowed.
   * Occurrence: Optional
   */
  restockingFeePercentage?: string;

  /**
   * Additional seller return instructions.
   * Support varies by marketplace/category.
   * Max length: 5000 (8000 for DE)
   * Occurrence: Optional
   */
  returnInstructions?: string;

  /**
   * Offer a replacement item as alternative to money back.
   * Occurrence: Optional
   */
  returnMethod?: string;

  /**
   * Domestic return period.
   * Required if returnsAccepted = true
   * Occurrence: Conditional
   */
  returnPeriod?: TimeDuration;

  /**
   * Whether seller accepts returns.
   * Occurrence: Required
   */
  returnsAccepted: boolean;

  /**
   * Who pays return shipping ("BUYER" | "SELLER").
   * Required if returnsAccepted = true
   * Occurrence: Conditional
   */
  returnShippingCostPayer?: string;
};

/**
 * Response payload for an updated return policy.
 */
export type SetReturnPolicyResponse = {
  /**
   * Always ALL_EXCLUDING_MOTORS_VEHICLES for return policies.
   * Occurrence: Always
   */
  categoryTypes: CategoryType[];

  /**
   * Seller-defined internal description.
   * Occurrence: Conditional
   */
  description?: string;

  /**
   * Deprecated. No longer returned.
   * Occurrence: Conditional
   */
  extendedHolidayReturnsOffered?: boolean;

  /**
   * Separate international return policy (if defined).
   * Occurrence: Conditional
   */
  internationalOverride?: InternationalReturnOverrideType;

  /**
   * Marketplace ID.
   * Occurrence: Always
   */
  marketplaceId: string;

  /**
   * Policy name.
   * Occurrence: Always
   */
  name: string;

  /**
   * Refund method (typically "MONEY_BACK" when returns accepted).
   * Occurrence: Conditional
   */
  refundMethod?: string;

  /**
   * Deprecated. Restocking fees not allowed.
   * Occurrence: Conditional
   */
  restockingFeePercentage?: string;

  /**
   * Additional seller instructions (if supported and set).
   * Occurrence: Conditional
   */
  returnInstructions?: string;

  /**
   * Replacement item offered.
   * Occurrence: Conditional
   */
  returnMethod?: string;

  /**
   * Domestic return period (when returns accepted).
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
   * Occurrence: Always
   */
  returnShippingCostPayer: string;

  /**
   * Processing warnings (and non-fatal errors).
   * Occurrence: Always
   */
  warnings: ErrorDetailV3[];
};

/**
 * @summary Update Return Policy
 * @description Updates an existing return policy identified by return_policy_id. Provide a complete policy payload; the existing resource is overwritten with the new details.
 * @method PUT
 * @path /sell/account/v1/return_policy/{return_policy_id}
 * @authentication OAuth access token with scope: https://api.ebay.com/oauth/api_scope/sell.account
 * @headers Content-Type: application/json (Required)
 * @params return_policy_id (Required)
 * @body ReturnPolicyRequest
 * @response 200 { "name": "3********y", "description": "Policy specifies an international return policy in addition to the domestic return policy.", "marketplaceId": "EBAY_US", "categoryTypes": [ { "name": "ALL_EXCLUDING_MOTORS_VEHICLES" } ], "returnsAccepted": true, "returnPeriod": { "value": 30, "unit": "DAY" }, "refundMethod": "MONEY_BACK", "returnMethod": "REPLACEMENT", "returnShippingCostPayer": "SELLER", "internationalOverride": { "returnsAccepted": true, "returnPeriod": { "value": 60, "unit": "DAY" }, "returnShippingCostPayer": "BUYER" }, "returnPolicyId": "5********0", "warnings": [] }
 * @status 200 OK
 * @status 400 Bad Request
 * @status 404 Not Found
 * @status 500 Internal Server Error
 * @error 20400 API_ACCOUNT REQUEST Invalid request. {additionalInfo}
 * @error 20401 API_ACCOUNT REQUEST Missing field {fieldName}.
 * @error 20402 API_ACCOUNT REQUEST Invalid input. {additionalInfo}
 * @error 20404 API_ACCOUNT REQUEST {fieldName} not found.
 * @error 20406 API_ACCOUNT REQUEST Invalid return option. {fieldName}
 * @error 20500 API_ACCOUNT APPLICATION System error.
 * @error 20501 API_ACCOUNT APPLICATION Service unavailable. Please try again in next 24 hours.
 * @warning 20200 API_ACCOUNT BUSINESS Warning. {additionalInfo}
 */
export type UpdateReturnPolicyAPI = {
  method: "PUT";
  path: "/sell/account/v1/return_policy/{return_policy_id}";
  params: UpdateReturnPolicyParams;
  payload: ReturnPolicyRequest;
  response: SetReturnPolicyResponse;
};
