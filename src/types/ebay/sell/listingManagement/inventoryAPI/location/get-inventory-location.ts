import type {
  Address,
  DayOfWeekEnum,
  GeoCoordinates,
  StatusEnum,
  StoreTypeEnum,
} from "../post/create-inventory-location.js";

/** Request shape for retrieving an inventory location. */
export type GetInventoryLocationRequest = {
  /** Unique merchant-defined key (max length 36). */
  merchantLocationKey: string;
};

/** Interval of open/close hours. */
export type Interval = {
  open: string;
  close: string;
};

/** Operating hours entry. */
export type OperatingHours = {
  dayOfWeekEnum: DayOfWeekEnum;
  intervals: Interval[];
};

/** Special hours entry overriding regular operating hours. */
export type SpecialHours = {
  date: string;
  intervals: Interval[];
};

/** Weekly schedule entry for fulfillment centers. */
export type WeeklySchedule = {
  cutOffTime: string;
  dayOfWeekEnum: DayOfWeekEnum[];
};

/** Overrides for same-day shipping cut-off times. */
export type Overrides = {
  cutOffTime: string;
  startDate: string;
  endDate: string;
};

/** Same-day shipping cut-off times for fulfillment centers. */
export type SameDayShippingCutOffTimes = {
  overrides?: Overrides[];
  weeklySchedule: WeeklySchedule[];
};

/** Fulfillment center specifications. */
export type FulfillmentCenterSpecifications = {
  sameDayShippingCutOffTimes: SameDayShippingCutOffTimes;
};

/** Location details container. */
export type Location = {
  address: Address;
  geoCoordinates?: GeoCoordinates;
  locationId: string;
};

/** Response shape for getInventoryLocation. */
export type GetInventoryLocationResponse = {
  location: Location;
  locationAdditionalInformation?: string;
  locationInstructions?: string;
  locationTypes: StoreTypeEnum[];
  locationWebUrl?: string;
  merchantLocationKey: string;
  merchantLocationStatus: StatusEnum;
  name?: string;
  operatingHours?: OperatingHours[];
  phone: string;
  specialHours?: SpecialHours[];
  timeZoneId?: string;
  fulfillmentCenterSpecifications?: FulfillmentCenterSpecifications;
};

/** HTTP status codes potentially returned by this operation. */
export type GetInventoryLocationHttpStatus = 200 | 400 | 404 | 500;

/** Options for executing getInventoryLocation. */
export type GetInventoryLocationOptions = {
  /** OAuth access token (authorization code grant). */
  accessToken: string;
  /** Set true to target the Sandbox environment. */
  sandbox?: boolean;
  /** Additional HTTP headers. */
  headers?: Record<string, string>;
};

/**
 * Retrieve details of an inventory location by merchantLocationKey.
 */
export declare function getInventoryLocation(
  request: GetInventoryLocationRequest,
  options: GetInventoryLocationOptions
): Promise<GetInventoryLocationResponse>;
