import type { TimeDurationUnitEnum } from "../../../../global/globalEbayTypes.js";
import type { CategoryTypeEnum, MarketplaceIdEnum } from "../fulfillmentPolicy/getFulfillmentPolicies.js";

/**
 * POST /sell/account/v1/payment_policy
 * Creates a new payment policy (seller’s terms for order payments).
 * On success:
 *  - HTTP 201 Created
 *  - Location header → URL of the new policy (contains paymentPolicyId)
 *  - Response payload → created policy (with paymentPolicyId)
 */

/* ===== Enums & shared types ===== */

/** Offline-only in modern flows; eBay manages electronic methods */
export type PaymentMethodTypeEnum =
  | "CASH_IN_PERSON"
  | "CASH_ON_DELIVERY"
  | "CASH_ON_PICKUP"
  | "CASHIER_CHECK"
  | "MONEY_ORDER"
  | "PERSONAL_CHECK"
  | (string & {});

/** Deprecated for new usage (eBay controls electronic brands) */
export type PaymentInstrumentBrandEnum = "AMERICAN_EXPRESS" | "DISCOVER" | "MASTERCARD" | "VISA" | (string & {});

/** Deprecated (PayPal is managed by eBay) */
export type RecipientAccountReferenceTypeEnum = "PAYPAL_EMAIL" | (string & {});

export type Amount = { currency: string; value: string };
export type TimeDuration = { unit: TimeDurationUnitEnum; value: number };

export type CategoryType = {
  /** @deprecated not used in create/update; may appear in GET payloads */
  default?: boolean;
  name: CategoryTypeEnum;
};

export type RecipientAccountReference = {
  /** @deprecated */
  referenceId?: string;
  /** @deprecated */
  referenceType?: RecipientAccountReferenceTypeEnum;
};

export type PaymentMethod = {
  paymentMethodType: PaymentMethodTypeEnum;
  /** @deprecated eBay manages electronic brands */
  brands?: PaymentInstrumentBrandEnum[];
  /** @deprecated eBay manages electronic accounts */
  recipientAccountReference?: RecipientAccountReference;
};

export type Deposit = {
  /** Max 2000.00 (or 500.00 if immediatePay = true) */
  amount?: Amount;
  /** 24, 48, or 72 hours (HOUR unit) */
  dueIn?: TimeDuration;
  /** @deprecated array – eBay manages electronic methods */
  paymentMethods?: PaymentMethod[];
};

/* ===== Request model ===== */
export type PaymentPolicyRequest = {
  name: string; // unique per marketplace
  marketplaceId: MarketplaceIdEnum; // required
  categoryTypes: CategoryType[]; // required (choose one type)
  description?: string; // seller-facing only (max 250)
  immediatePay?: boolean; // true for BIN/fixed-price/etc.
  /** For MOTORS_VEHICLES listings: required */
  fullPaymentDueIn?: TimeDuration; // 3|7|10|14 DAY (7 default)
  /** For MOTORS_VEHICLES (optional): deposit amount & due window */
  deposit?: Deposit;

  /**
   * Only for categories that support/offline payments.
   * eBay manages electronic payments; leave empty otherwise.
   */
  paymentMethods?: PaymentMethod[];

  /** @deprecated - ignored by eBay */
  paymentInstructions?: string;
};

/* ===== Response model ===== */
export type SetPaymentPolicyResponse = {
  name: string;
  marketplaceId: MarketplaceIdEnum;
  categoryTypes: CategoryType[];
  paymentPolicyId: string; // newly assigned ID
  immediatePay: boolean;
  description?: string;

  /** Present for MOTORS policies */
  fullPaymentDueIn?: TimeDuration;
  deposit?: Deposit;

  paymentMethods: PaymentMethod[]; // often empty unless offline needed
  /** @deprecated legacy field, can be ignored */
  paymentInstructions?: string;

  warnings: ErrorDetailV3[];
};

export type ErrorDetailV3 = {
  category?: "Application" | "Business" | "Request" | string;
  domain?: string;
  subdomain?: string;
  errorId?: number;
  message?: string;
  longMessage?: string;
  inputRefIds?: string[];
  outputRefIds?: string[];
  parameters?: { name: string; value: string }[];
};

/* ===== Headers ===== */
export type CreatePaymentPolicyHeaders = {
  Authorization: `Bearer ${string}`; // OAuth token (auth-code grant)
  "Content-Type": "application/json";
  [header: string]: string | undefined;
};

/* ===== API shape ===== */
/**
 * @summary Create Payment Policy
 * @method POST
 * @path /sell/account/v1/payment_policy
 * @body PaymentPolicyRequest
 * @scopes
 *   - https://api.ebay.com/oauth/api_scope/sell.account
 * @responses
 *   - 201 Created → SetPaymentPolicyResponse (Location header set)
 *   - 400 Bad Request
 *   - 500 Internal Server Error
 * @errors
 *   - 20400 Invalid request
 *   - 20401 Missing field {fieldName}
 *   - 20403 Invalid {fieldName}
 *   - 20404 {fieldName} not found
 *   - 20405 Invalid payment method {fieldName}
 *   - 20500 System error
 *   - 20501 Service unavailable
 */
export type CreatePaymentPolicyAPI = {
  method: "POST";
  path: "/sell/account/v1/payment_policy";
  headers: CreatePaymentPolicyHeaders;
  body: PaymentPolicyRequest;
  response: SetPaymentPolicyResponse;
};
