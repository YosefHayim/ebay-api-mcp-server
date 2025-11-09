import type { CountryCodeEnum } from "../../inventory-api-global-types.js";
import type { DayOfWeekEnum, StoreTypeEnum } from "./create-inventory-location.js";

/**
 * POST https://api.ebay.com/sell/inventory/v1/location/{merchantLocationKey}/update_location_details
 * (Sandbox: https://api.sandbox.ebay.com/...)
 * Update details for an existing inventory location.
 *
 * Notes:
 * - Requires OAuth scope: https://api.ebay.com/oauth/api_scope/sell.inventory
 * - Headers: Authorization, Content-Type: application/json
 * - Overwrites provided fields (text values replace existing ones).
 * - Address fields cannot be changed for fulfillment centers (can be added once if omitted at creation).
 * - For store locations, operatingHours and specialHours can be updated.
 * - Successful update returns HTTP 204 No Content.
 */

/** Path params */
export type UpdateInventoryLocationPath = {
  /** Merchant-defined location key (max length 36). */
  merchantLocationKey: string;
};

/** Address object for a location. */
export type Address = {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country: CountryCodeEnum;
  county?: string;
  postalCode?: string;
  stateOrProvince?: string;
};

/** Geo coordinates for a location. */
export type GeoCoordinates = {
  /** Latitude (e.g., 33.089805). */
  latitude: number;
  /** Longitude (e.g., -88.709822). */
  longitude: number;
};

/** Opening/closing time interval in local (24h) time, e.g., "09:00:00". */
export type Interval = {
  open: string;
  close: string;
};

/** Regular weekly operating hours for a store location. */
export type OperatingHours = {
  dayOfWeekEnum: DayOfWeekEnum;
  intervals: Interval[];
};

/** Special hours for a specific date (ISO date-time, UTC). */
export type SpecialHours = {
  /** ISO 8601 date-time, e.g., "2025-08-04T00:00:00.000Z". */
  date: string;
  /** Empty intervals array => closed for the date. */
  intervals: Interval[];
};

/** Fulfillment center cut-off overrides for specific date ranges. */
export type SameDayCutOffOverride = {
  /** “HH:mm” 24h format (local to timeZoneId/address). */
  cutOffTime: string;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
};

/** Weekly schedule entry for same-day shipping cut-off. */
export type WeeklySchedule = {
  /** “HH:mm” 24h format. */
  cutOffTime: string;
  /** Days this cutOffTime applies to. */
  dayOfWeekEnum: DayOfWeekEnum[];
};

/** Same-day shipping cut-off times container (for fulfillment centers). */
export type SameDayShippingCutOffTimes = {
  overrides?: SameDayCutOffOverride[];
  weeklySchedule?: WeeklySchedule[];
};

/** Fulfillment center specifications. */
export type FulfillmentCenterSpecifications = {
  sameDayShippingCutOffTimes?: SameDayShippingCutOffTimes;
};

/** LocationDetails wrapper used in the request. */
export type LocationDetails = {
  address: Address;
  geoCoordinates?: GeoCoordinates;
};

/** Request body for updateInventoryLocation. */
export type UpdateInventoryLocationRequest = {
  /** Physical address/geo info. Address required within this object. */
  location?: LocationDetails;
  /** Free text (max ~256 chars). */
  locationAdditionalInformation?: string;
  /** Pickup instructions (max ~1000 chars). */
  locationInstructions?: string;
  /** Location type(s): STORE | WAREHOUSE | FULFILLMENT_CENTER. */
  locationTypes?: StoreTypeEnum[];
  /** Website URL for the location (max ~512 chars). */
  locationWebUrl?: string;
  /** Human-friendly name (required for store listings with pickup/collect). */
  name?: string;
  /** Regular weekly hours (store locations). */
  operatingHours?: OperatingHours[];
  /** Phone number (max ~36 chars). */
  phone?: string;
  /** Special hours for specific dates (store locations). */
  specialHours?: SpecialHours[];
  /** Olson TZ, e.g., "America/Los_Angeles". */
  timeZoneId?: string;
  /** Fulfillment center shipping specs. */
  fulfillmentCenterSpecifications?: FulfillmentCenterSpecifications;
};

/** HTTP status codes potentially returned by this operation. */
export type UpdateInventoryLocationHttpStatus = 204 | 400 | 404 | 500;

/** Options for executing updateInventoryLocation. */
export type UpdateInventoryLocationOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers. */
  headers?: Record<string, string>;
};

/**
 * Update an inventory location’s details.
 * Returns nothing on success (HTTP 204).
 */
export declare function updateInventoryLocation(
  path: UpdateInventoryLocationPath,
  request: UpdateInventoryLocationRequest,
  options: UpdateInventoryLocationOptions
): Promise<void>;
