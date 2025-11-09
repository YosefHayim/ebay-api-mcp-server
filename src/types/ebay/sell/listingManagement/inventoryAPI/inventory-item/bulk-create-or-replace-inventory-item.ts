import type {
  AvailabilityTypeEnum,
  ConditionEnum,
  LengthUnitOfMeasureEnum,
  LocaleEnum,
  PackageTypeEnum,
  TimeDurationUnitEnum,
  WeightUnitOfMeasureEnum,
} from "@/types/ebay/global/globalEbayTypes";
import type { ErrorDetailV3 } from "../../inventory-api-global-types.js";

/**
 * Reusable time duration block (unit + value).
 */
export type TimeDuration = {
  unit?: TimeDurationUnitEnum;
  value?: number;
};

export type PickupAtLocationAvailability = {
  availabilityType?: AvailabilityTypeEnum;
  fulfillmentTime?: TimeDuration;
  merchantLocationKey?: string;
  quantity?: number;
};

export type AvailabilityDistribution = {
  fulfillmentTime?: TimeDuration;
  merchantLocationKey?: string;
  quantity?: number;
};

export type ShipToLocationAvailability = {
  availabilityDistributions?: AvailabilityDistribution[];
  quantity?: number;
};

export type Availability = {
  pickupAtLocationAvailability?: PickupAtLocationAvailability[];
  shipToLocationAvailability?: ShipToLocationAvailability;
};

export type Dimension = {
  height?: number;
  length?: number;
  unit?: LengthUnitOfMeasureEnum;
  width?: number;
};

export type Weight = {
  unit?: WeightUnitOfMeasureEnum;
  value?: number;
};

export type PackageWeightAndSize = {
  dimensions?: Dimension;
  packageType?: PackageTypeEnum;
  shippingIrregular?: boolean;
  weight?: Weight;
};

export type ConditionDescriptor = {
  additionalInfo?: string;
  name?: string; // numeric id as string, per API docs
  values?: string[]; // numeric ids as strings
};

export type ProductProps = {
  aspects?: Record<string, string[]>; // map of aspect name -> values[]
  brand?: string;
  description?: string;
  ean?: string[];
  epid?: string;
  imageUrls?: string[];
  isbn?: string[];
  mpn?: string;
  subtitle?: string;
  title?: string;
  upc?: string[];
  videoIds?: string[];
};

export type InventoryItemWithSkuLocale = {
  availability?: Availability;
  condition?: ConditionEnum;
  conditionDescription?: string;
  conditionDescriptors?: ConditionDescriptor[];
  locale: LocaleEnum; // required
  packageWeightAndSize?: PackageWeightAndSize;
  product?: ProductProps;
  sku: string; // required
};

/**
 * Request payload for bulk create/replace (up to 25 items).
 */
export type BulkCreateOrReplaceInventoryItemRequest = {
  requests: InventoryItemWithSkuLocale[];
};

/**
 * Per-item response entry.
 */
export type InventoryItemResponse = {
  errors?: ErrorDetailV3[];
  locale: LocaleEnum;
  sku: string;
  statusCode: number;
  warnings?: ErrorDetailV3[];
};

/**
 * Response wrapper for bulk operation.
 */
export type BulkCreateOrReplaceInventoryItemResponse = {
  responses: InventoryItemResponse[];
};

/**
 * API surface declaration (method, path, payload, response).
 */
export type BulkCreateOrReplaceInventoryItemAPI = {
  method: "POST";
  path: "/sell/inventory/v1/bulk_create_or_replace_inventory_item";
  payload: BulkCreateOrReplaceInventoryItemRequest;
  response: BulkCreateOrReplaceInventoryItemResponse;
};
