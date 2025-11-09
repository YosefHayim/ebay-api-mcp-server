/**
 * PUT /sell/account/v1/payment_policy/{payment_policy_id}
 * Overwrites an existing payment policy with the payload you send.
 *
 * Scope:
 *  - https://api.ebay.com/oauth/api_scope/sell.account
 *
 * Base URLs:
 *  - Prod:    https://api.ebay.com
 *  - Sandbox: https://api.sandbox.ebay.com
 */

type TimeUnit = "YEAR" | "MONTH" | "DAY" | "HOUR" | "MINUTE" | "SECOND";
type TimeDuration = { unit: TimeUnit; value: number };
type Amount = { currency: string; value: string };
type CategoryTypeName = "MOTORS_VEHICLES" | "ALL_EXCLUDING_MOTORS_VEHICLES";
type PaymentMethodType =
  | "CASH_IN_PERSON"
  | "CASH_ON_DELIVERY"
  | "CASH_ON_PICKUP"
  | "CASHIER_CHECK"
  | "MONEY_ORDER"
  | "PERSONAL_CHECK";

/** The request body you must send in the PUT. (Full object, not partial!) */
export type PaymentPolicyRequest = {
  categoryTypes: { name: CategoryTypeName }[]; // required
  name: string; // required
  marketplaceId: string; // required (e.g., "EBAY_US")
  description?: string;
  immediatePay?: boolean;
  paymentInstructions?: string; // legacy, ignored by eBay now
  paymentMethods?: { paymentMethodType: PaymentMethodType }[]; // offline methods only
  // Motors-only:
  fullPaymentDueIn?: TimeDuration;
  deposit?: { amount?: Amount; dueIn?: TimeDuration };
};

/** The response you get back. */
export type PaymentPolicyResponse = PaymentPolicyRequest & {
  paymentPolicyId: string;
  warnings?: {
    category?: string;
    domain?: string;
    errorId?: number;
    message?: string;
    longMessage?: string;
  }[];
};
