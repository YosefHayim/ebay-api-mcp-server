/** Request shape for disabling an inventory location. */
export type DisableInventoryLocationRequest = {
  /** Unique merchant-defined location key (max length 36). */
  merchantLocationKey: string;
};

/** Response shape: no payload returned on success. */
export type DisableInventoryLocationResponse = undefined;

/** HTTP status codes potentially returned by this operation. */
export type DisableInventoryLocationHttpStatus = 200 | 400 | 404 | 500;

/** Options for executing disableInventoryLocation. */
export type DisableInventoryLocationOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers. */
  headers?: Record<string, string>;
};

/**
 * Disable an inventory location by merchantLocationKey.
 * Returns no payload on success (200 OK).
 */
export declare function disableInventoryLocation(
  request: DisableInventoryLocationRequest,
  options: DisableInventoryLocationOptions
): Promise<DisableInventoryLocationResponse>;
