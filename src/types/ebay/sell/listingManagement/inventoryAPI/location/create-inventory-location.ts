import type { CountryCodeEnum } from "../../inventory-api-global-types.js";

/** Location operating interval (local time, 24h). */
export type Interval = {
  open: string; // HH:MM:SS
  close: string; // HH:MM:SS
};

/** Standard weekly operating hours for a STORE location. */
export type OperatingHours = {
  dayOfWeekEnum: DayOfWeekEnum;
  intervals: Interval[];
};

/** Date-specific operating hours override for a STORE location. */
export type SpecialHours = {
  date: string; // ISO 8601 date-time (UTC)
  intervals: Interval[]; // empty array means closed
};

/** Request body for createInventoryLocation. */
export type InventoryLocationFull = {
  location: LocationDetails;

  locationAdditionalInformation?: string;
  locationInstructions?: string;

  /** Defaults to WAREHOUSE if omitted. */
  locationTypes?: StoreTypeEnum[];

  locationWebUrl?: string;

  /** Defaults to ENABLED if omitted. */
  merchantLocationStatus?: StatusEnum;

  /** Human-friendly name (required for STORE before publishing). */
  name?: string;

  operatingHours?: OperatingHours[];
  phone: string;
  specialHours?: SpecialHours[];

  /** Olson TZ ID, e.g., "America/Los_Angeles". */
  timeZoneId?: string;

  /** Required when one of locationTypes is FULFILLMENT_CENTER. */
  fulfillmentCenterSpecifications?: FulfillmentCenterSpecifications;
};

/** No response payload on success (HTTP 204). */
export type CreateInventoryLocationResponse = undefined;

/** HTTP status codes potentially returned by this operation. */
export type CreateInventoryLocationHttpStatus = 204 | 400 | 409 | 500;

/** Options for executing createInventoryLocation. */
export type CreateInventoryLocationOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers (Content-Type will be application/json). */
  headers?: Record<string, string>;
};

/**
 * Create a new inventory location identified by merchantLocationKey.
 * Returns no payload on success (204 No Content).
 */
export declare function createInventoryLocation(
  merchantLocationKey: string,
  body: InventoryLocationFull,
  options: CreateInventoryLocationOptions
): Promise<CreateInventoryLocationResponse>;

// inventory-api-global-types/create-inventory-location-types.d.ts

/** Enumerated days of the week used by operating hours and weekly cut-off schedules. */
export enum DayOfWeekEnum {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

/** Location role(s) for an inventory location. */
export enum StoreTypeEnum {
  STORE = "STORE",
  WAREHOUSE = "WAREHOUSE",
  FULFILLMENT_CENTER = "FULFILLMENT_CENTER",
}

/** Enablement status of a merchant location. */
export enum StatusEnum {
  DISABLED = "DISABLED",
  ENABLED = "ENABLED",
}

/**
 * Overrides
 * Defines special-date overrides for same-day handling cut-off times.
 * Format notes:
 * - cutOffTime: "HH:MM" (24h, local to timeZoneId/address)
 * - startDate/endDate: "YYYY-MM-DD" (UTC date; same value = single-day override)
 */
export type Overrides = {
  cutOffTime: string;
  endDate: string;
  startDate: string;
};

/**
 * WeeklySchedule
 * Describes weekly same-day handling cut-off times.
 * - cutOffTime: "HH:MM" (24h)
 * - dayOfWeekEnum: days this cut-off applies to; omit a day => considered holiday for that day.
 */
export type WeeklySchedule = {
  cutOffTime: string;
  dayOfWeekEnum: DayOfWeekEnum[];
};

/**
 * SameDayShippingCutOffTimes
 * Applies only when the location participates in same-day handling.
 * - weeklySchedule: required; at least one entry covering operating business days.
 * - overrides: optional per-date or date-range cut-off overrides.
 */
export type SameDayShippingCutOffTimes = {
  overrides?: Overrides[];
  weeklySchedule: WeeklySchedule[];
};

/**
 * FulfillmentCenterSpecifications
 * Required when one of the locationTypes is FULFILLMENT_CENTER.
 * - sameDayShippingCutOffTimes: required for listings with same-day handling.
 */
export type FulfillmentCenterSpecifications = {
  sameDayShippingCutOffTimes: SameDayShippingCutOffTimes;
};

/**
 * Address
 * Physical address of an inventory location.
 * Notes:
 * - For STORE and FULFILLMENT_CENTER: full address required
 *   (addressLine1, city, stateOrProvince, postalCode, country).
 * - For WAREHOUSE: either (city + stateOrProvince + country) OR (postalCode + country).
 */
export type Address = {
  /** Line 1 of the street address. Required for STORE and FULFILLMENT_CENTER. Max length: 128 */
  addressLine1?: string;
  /** Line 2 of the street address (suite, apt, etc.). Max length: 128 */
  addressLine2?: string;
  /** City. Required for STORE and FULFILLMENT_CENTER; conditional for WAREHOUSE. Max length: 128 */
  city?: string;
  /** ISO 3166-1 alpha-2 country code. Required. */
  country: CountryCodeEnum;
  /** County. Optional. */
  county?: string;
  /**
   * Postal/ZIP code. Required for STORE and FULFILLMENT_CENTER;
   * conditional for WAREHOUSE (if city/state not provided). Max length: 16
   */
  postalCode?: string;
  /**
   * State/Province. Required for STORE and FULFILLMENT_CENTER;
   * conditional for WAREHOUSE (if postalCode not provided). Max length: 128
   */
  stateOrProvince?: string;
};

/**
 * GeoCoordinates
 * GPS coordinates for an inventory location.
 * Required when enabling In-Store Pickup at a location.
 */
export type GeoCoordinates = {
  /** Latitude (North–South). Required if geoCoordinates is provided. Example: 33.089805 */
  latitude: number;
  /** Longitude (East–West). Required if geoCoordinates is provided. Example: -88.709822 */
  longitude: number;
};

/**
 * LocationDetails
 * Full or partial address for an inventory location, with optional GPS coordinates.
 */
export type LocationDetails = {
  /** Physical address (see Address type for conditional requirements). */
  address: Address;
  /** GPS coordinates (required for In-Store Pickup locations). */
  geoCoordinates?: GeoCoordinates;
};
