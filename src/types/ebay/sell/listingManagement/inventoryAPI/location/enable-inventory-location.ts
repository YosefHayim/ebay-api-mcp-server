/** Request shape for enabling an inventory location. */
export type EnableInventoryLocationRequest = {
  /** Unique merchant-defined location key (max length 36). */
  merchantLocationKey: string;
};

/** Response shape: no payload returned on success. */
export type EnableInventoryLocationResponse = undefined;

/** HTTP status codes potentially returned by this operation. */
export type EnableInventoryLocationHttpStatus = 200 | 400 | 404 | 500;

/** Options for executing enableInventoryLocation. */
export type EnableInventoryLocationOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers. */
  headers?: Record<string, string>;
};

/**
 * Enable an inventory location by merchantLocationKey.
 * Returns no payload on success (200 OK).
 */
export declare function enableInventoryLocation(
  request: EnableInventoryLocationRequest,
  options: EnableInventoryLocationOptions
): Promise<EnableInventoryLocationResponse>;
