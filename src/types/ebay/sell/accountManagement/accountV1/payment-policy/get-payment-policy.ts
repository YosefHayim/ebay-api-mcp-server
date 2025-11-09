/**
 * GET /sell/account/v1/payment_policy/{payment_policy_id}
 * Returns a single payment policy by ID.
 *
 * Auth scope:
 *   - https://api.ebay.com/oauth/api_scope/sell.account
 *   - (readonly also works) https://api.ebay.com/oauth/api_scope/sell.account.readonly
 *
 * Sandbox base URL: https://api.sandbox.ebay.com
 * Prod base URL:    https://api.ebay.com
 */

/* ===== Minimal response types (trimmed) ===== */
type TimeDurationUnit = "YEAR" | "MONTH" | "DAY" | "HOUR" | "MINUTE" | "SECOND";
type TimeDuration = { unit: TimeDurationUnit; value: number };
type Amount = { currency: string; value: string };

type PaymentMethodType =
  | "CASH_IN_PERSON"
  | "CASH_ON_DELIVERY"
  | "CASH_ON_PICKUP"
  | "CASHIER_CHECK"
  | "MONEY_ORDER"
  | "PERSONAL_CHECK";

export type PaymentPolicy = {
  paymentPolicyId: string;
  name: string;
  marketplaceId: string;
  immediatePay: boolean;
  description?: string;
  paymentInstructions?: string; // legacy
  categoryTypes: { name: "MOTORS_VEHICLES" | "ALL_EXCLUDING_MOTORS_VEHICLES" }[];
  paymentMethods?: { paymentMethodType: PaymentMethodType }[];
  // Motors-only:
  fullPaymentDueIn?: TimeDuration;
  deposit?: { amount?: Amount; dueIn?: TimeDuration };
};

/* ===== Headers ===== */
export type GetPaymentPolicyHeaders = {
  Authorization: `Bearer ${string}`;
  [header: string]: string | undefined;
};
