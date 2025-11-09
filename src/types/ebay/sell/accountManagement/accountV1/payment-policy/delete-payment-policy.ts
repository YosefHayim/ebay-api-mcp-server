/**
 * DELETE /sell/account/v1/payment_policy/{payment_policy_id}
 * Deletes a payment policy by its ID.
 *
 * On success:
 *  - HTTP 204 No Content
 *  - No response body/headers of interest
 */

/* ===== Path params ===== */
export type DeletePaymentPolicyPath = {
  /** ID of the payment policy to delete */
  payment_policy_id: string;
};

/* ===== Headers ===== */
export type DeletePaymentPolicyHeaders = {
  Authorization: `Bearer ${string}`; // OAuth token (auth-code grant)
  [header: string]: string | undefined;
};

/* ===== API shape ===== */
/**
 * @summary Delete Payment Policy
 * @method DELETE
 * @path /sell/account/v1/payment_policy/{payment_policy_id}
 * @scopes
 *   - https://api.ebay.com/oauth/api_scope/sell.account
 * @responses
 *   - 204 No Content (success)
 *   - 400 Bad Request
 *   - 404 Not Found
 *   - 500 Internal Server Error
 * @errors
 *   - 20401 Missing field {fieldName}
 *   - 20402 Invalid input
 *   - 20403 Invalid {fieldName}
 *   - 20404 {fieldName} not found
 *   - 20409 Invalid default policy type
 *   - 21409 Invalid default for category type
 *   - 22409 Invalid target default policy
 *   - 20500 System error
 *   - 20501 Service unavailable
 */
export type DeletePaymentPolicyAPI = {
  method: "DELETE";
  path: `/sell/account/v1/payment_policy/${string}`;
  pathParams: DeletePaymentPolicyPath;
  headers: DeletePaymentPolicyHeaders;
  /** 204 has no body */
  response: undefined;
};
