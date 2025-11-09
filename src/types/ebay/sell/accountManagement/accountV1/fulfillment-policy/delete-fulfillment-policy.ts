/**
 * DELETE /sell/account/v1/fulfillment_policy/{fulfillmentPolicyId}
 * Deletes a fulfillment policy by ID.
 * No request body. No response body (204 No Content on success).
 */

export type DeleteFulfillmentPolicyPathParams = {
  /**
   * The unique ID of the fulfillment policy to delete.
   * Occurrence: Required
   */
  fulfillmentPolicyId: string;
};

/**
 * @summary Delete Fulfillment Policy
 * @description Deletes the specified fulfillment policy. Provide the policy ID in the path.
 * @method DELETE
 * @path /sell/account/v1/fulfillment_policy/{fulfillmentPolicyId}
 * @authentication OAuth access token with scope: https://api.ebay.com/oauth/api_scope/sell.account
 * @headers None required beyond Authorization
 * @response 204 No Content
 * @status 204 No Content
 * @status 400 Bad Request
 * @status 404 Not Found
 * @status 500 Internal Server Error
 * @error 20401 API_ACCOUNT REQUEST Missing field {fieldName}. {additionalInfo}
 * @error 20402 API_ACCOUNT REQUEST Invalid input. {additionalInfo}
 * @error 20403 API_ACCOUNT REQUEST Invalid {fieldName}. {additionalInfo}
 * @error 20404 API_ACCOUNT REQUEST {fieldName} not found.
 * @error 20409 API_ACCOUNT BUSINESS Invalid default policy type. {additionalInfo}
 * @error 21409 API_ACCOUNT BUSINESS Invalid default for category type. {additionalInfo}
 * @error 22409 API_ACCOUNT BUSINESS Invalid target default policy. {additionalInfo}
 * @error 20500 API_ACCOUNT APPLICATION System error.
 * @error 20501 API_ACCOUNT APPLICATION Service unavailable. Please try again in next 24 hours.
 */
export type DeleteFulfillmentPolicyAPI = {
  method: "DELETE";
  path: `/sell/account/v1/fulfillment_policy/${string}`;
  params: DeleteFulfillmentPolicyPathParams;
  // No payload for DELETE
  payload: undefined;
  // No response body on success
  response: null;
};
