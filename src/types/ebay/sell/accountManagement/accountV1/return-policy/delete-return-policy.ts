/**
 * Path parameter for delete operation.
 */
export type DeleteReturnPolicyParams = {
  /**
   * Unique identifier of the return policy to delete.
   * Occurrence: Required
   */
  return_policy_id: string;
};

/**
 * @summary Delete Return Policy
 * @description Deletes an existing return policy. Provide the eBay-assigned returnPolicyId in the path. On success, returns HTTP 204 with no content.
 * @method DELETE
 * @path /sell/account/v1/return_policy/{return_policy_id}
 * @authentication OAuth access token with scope: https://api.ebay.com/oauth/api_scope/sell.account
 * @headers None required beyond Authorization
 * @body None
 * @response 204
 * @status 204 No Content
 * @status 400 Bad Request
 * @status 404 Not Found
 * @status 500 Internal Server Error
 * @error 20401 API_ACCOUNT REQUEST Missing field {fieldName}. {additionalInfo}
 * @error 20402 API_ACCOUNT REQUEST Invalid input. {additionalInfo}
 * @error 20404 API_ACCOUNT REQUEST {fieldName} not found.
 * @error 20409 API_ACCOUNT BUSINESS Invalid default policy type. {additionalInfo}
 * @error 20500 API_ACCOUNT APPLICATION System error.
 * @error 20501 API_ACCOUNT APPLICATION Service unavailable. Please try again in next 24 hours.
 * @error 21409 API_ACCOUNT BUSINESS Invalid default for category type. {additionalInfo}
 * @error 22409 API_ACCOUNT BUSINESS Invalid target default policy. {additionalInfo}
 */
export type DeleteReturnPolicyAPI = {
  method: "DELETE";
  path: "/sell/account/v1/return_policy/{return_policy_id}";
  params: DeleteReturnPolicyParams;
  payload: never;
  response: never;
};
