import type { Availability, Condition, EbayError, PackageWeightAndSize } from "@/types/ebay/global/globalEbayTypes";
import type { ConditionDescriptor, Product } from "../../inventory-api-global-types.js";

/**
 * Path parameters for createOrReplaceInventoryItem.
 * sku: Seller-defined SKU (unique per seller). Max length: 50
 * Occurrence: Required
 */
export type CreateOrReplaceInventoryItemPathParams = {
  sku: string;
};

/**
 * Request body for createOrReplaceInventoryItem.
 * Provide any subset initially; replacing an existing record requires sending the full current state.
 */
export type CreateOrReplaceInventoryItemRequest = {
  /**
   * Quantity/locations for purchase (pickup + ship-to-home).
   * Required when publishing an offer, or when replacing an item that already has availability.
   * Occurrence: Conditional
   */
  availability?: Availability;

  /**
   * Item condition (site/category dependent).
   * Required when publishing; optional before that.
   * Occurrence: Conditional
   */
  condition?: Condition;

  /**
   * Free-text detail for non-new items; ignored for new conditions.
   * Max length: 1000
   * Occurrence: Optional (required if replacing and field already exists)
   */
  conditionDescription?: string;

  /**
   * Structured condition name/value descriptors.
   * Occurrence: Conditional
   */
  conditionDescriptors?: ConditionDescriptor[];

  /**
   * Package dimensions/weight (for calculated shipping or weight surcharge).
   * Occurrence: Conditional (required if replacing and package data already exists)
   */
  packageWeightAndSize?: PackageWeightAndSize;

  /**
   * Catalog/product metadata (title, description, identifiers, aspects, images, video).
   * Required before publishing an offer, or if replacing and product data already exists.
   * Occurrence: Conditional
   */
  product?: Product;
};

/**
 * Response body (BaseResponse).
 * Warnings/errors triggered by the operation are returned here.
 */
export type CreateOrReplaceInventoryItemResponse = {
  /**
   * Warning/error details (V3) with context parameters and domains.
   * Occurrence: Conditional
   */
  warnings?: EbayError[];
};
