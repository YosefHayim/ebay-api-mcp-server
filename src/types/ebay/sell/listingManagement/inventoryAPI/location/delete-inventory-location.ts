/** No payload is required in request. */
export type DeleteInventoryLocationRequest = {
  /** Unique merchant-defined location key (max length 36). */
  merchantLocationKey: string;
};

/** No response payload on success (HTTP 204). */
export type DeleteInventoryLocationResponse = undefined;

/** HTTP status codes potentially returned by this operation. */
export type DeleteInventoryLocationHttpStatus = 204 | 400 | 404 | 500;

/** Options for executing deleteInventoryLocation. */
export type DeleteInventoryLocationOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers. */
  headers?: Record<string, string>;
};

/**
 * Delete an inventory location by merchantLocationKey.
 * Returns no payload on success (204 No Content).
 */
export declare function deleteInventoryLocation(
  request: DeleteInventoryLocationRequest,
  options: DeleteInventoryLocationOptions
): Promise<DeleteInventoryLocationResponse>;
