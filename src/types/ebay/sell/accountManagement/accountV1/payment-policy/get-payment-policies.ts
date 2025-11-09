/**
 * GET /sell/account/v1/payment_policy?marketplace_id={MarketplaceIdEnum}
 * Returns all payment policies for a given marketplace.
 *
 * Auth scope:
 *   - https://api.ebay.com/oauth/api_scope/sell.account
 *   - (readonly also works) https://api.ebay.com/oauth/api_scope/sell.account.readonly
 *
 * Sandbox base URL: https://api.sandbox.ebay.com
 * Prod base URL:    https://api.ebay.com
 */

import type { Amount, TimeDuration } from "../post/create-payment-policy.js";

/* ===== Query & Headers ===== */
export type GetPaymentPoliciesQuery = {
  /** e.g. "EBAY_US", "EBAY_GB", ... (required) */
  marketplace_id: string;
};

export type GetPaymentPoliciesHeaders = {
  Authorization: `Bearer ${string}`;
  /** Optional: e.g. "fr-CA", "nl-BE" to target specific locale variants */
  "Content-Language"?: string;
  [header: string]: string | undefined;
};

export type PaymentMethod = {
  paymentMethodType:
  | "CASH_IN_PERSON"
  | "CASH_ON_DELIVERY"
  | "CASH_ON_PICKUP"
  | "CASHIER_CHECK"
  | "MONEY_ORDER"
  | "PERSONAL_CHECK";
};

export type PaymentPolicy = {
  paymentPolicyId: string;
  name: string;
  marketplaceId: string;
  immediatePay: boolean;
  description?: string;
  paymentInstructions?: string; // legacy, often ignored
  categoryTypes: { name: "MOTORS_VEHICLES" | "ALL_EXCLUDING_MOTORS_VEHICLES" }[];
  paymentMethods?: PaymentMethod[];
  // Motors-only fields (optional on non-motors):
  fullPaymentDueIn?: TimeDuration;
  deposit?: { amount?: Amount; dueIn?: TimeDuration };
};

export type GetPaymentPoliciesResponse = {
  total: number;
  paymentPolicies: PaymentPolicy[];
  href?: string;
  next?: string;
  prev?: string;
  limit?: number;
  offset?: number;
};
