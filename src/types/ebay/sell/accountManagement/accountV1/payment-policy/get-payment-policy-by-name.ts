/**
 * GET /sell/account/v1/payment_policy/get_by_policy_name
 * Look up a payment policy by its name + marketplace.
 *
 * Auth scopes (either works):
 *  - https://api.ebay.com/oauth/api_scope/sell.account
 *  - https://api.ebay.com/oauth/api_scope/sell.account.readonly
 *
 * Base URLs:
 *  - Prod:    https://api.ebay.com
 *  - Sandbox: https://api.sandbox.ebay.com
 */

/* ===== Minimal response types (trimmed to what this call returns) ===== */
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
  paymentInstructions?: string; // legacy, may be present on old policies
  categoryTypes: { name: "MOTORS_VEHICLES" | "ALL_EXCLUDING_MOTORS_VEHICLES" }[];
  paymentMethods?: { paymentMethodType: PaymentMethodType }[];
  // Motors-only (when categoryTypes.name === "MOTORS_VEHICLES"):
  fullPaymentDueIn?: TimeDuration;
  deposit?: { amount?: Amount; dueIn?: TimeDuration };
};

export type GetByNameHeaders = {
  Authorization: `Bearer ${string}`;
  /** Optional locale targeting for multi-locale marketplaces, e.g. "fr-CA", "nl-BE" */
  "Content-Language"?: string;
  [header: string]: string | undefined;
};
