import type { GetInventoryLocationResponse } from "./get-inventory-location.js";

/** Query params for getInventoryLocations. */
export type GetInventoryLocationsQueryParams = {
  /** Number of results to skip before returning the first result (default 0). */
  offset?: number;
  /** Max number of records per page (min 1, default 100). */
  limit?: number;
};

/** Paged response for getInventoryLocations. */
export type GetInventoryLocationsResponse = {
  /** URI of the current page. */
  href?: string;
  /** Max records per page. */
  limit?: number;
  /** URI for next page, if any. */
  next?: string;
  /** Zero-based offset used for this page. */
  offset?: number;
  /** URI for previous page, if any. */
  prev?: string;
  /** Total number of items across all pages. */
  total?: number;
  /** The inventory locations for this page. */
  locations?: GetInventoryLocationResponse[];
};

/** HTTP status codes potentially returned by this operation. */
export type GetInventoryLocationsHttpStatus = 200 | 400 | 500;

/** Options for executing getInventoryLocations. */
export type GetInventoryLocationsOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers. */
  headers?: Record<string, string>;
};

/**
 * Retrieve all inventory locations with optional pagination.
 */
export declare function getInventoryLocations(
  query: GetInventoryLocationsQueryParams,
  options: GetInventoryLocationsOptions
): Promise<GetInventoryLocationsResponse>;
