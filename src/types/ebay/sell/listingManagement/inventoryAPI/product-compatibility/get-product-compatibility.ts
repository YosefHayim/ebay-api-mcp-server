import type { CompatibleProduct, NameValueList } from "../../inventory-api-global-types.js";

/**
 * Path parameters for getProductCompatibility.
 * sku: Seller-defined SKU. Max length: 50
 * Occurrence: Required
 */
export type GetProductCompatibilityPathParams = {
  sku: string;
};

/**
 * CompatibleProduct shape for GET (productIdentifier is not returned).
 */
export type CompatibleProductGet = Omit<CompatibleProduct, "productIdentifier"> & {
  /**
   * Vehicle aspects (e.g., make/model/year/trim/engine).
   * Occurrence: Conditional
   */
  compatibilityProperties?: NameValueList[];

  /**
   * Free-text notes.
   * Max Length: 500
   * Occurrence: Conditional
   */
  notes?: string;

  /**
   * Deprecated; may appear in legacy data.
   * Occurrence: Conditional
   */
  productFamilyProperties?: CompatibleProduct["productFamilyProperties"];
};

/**
 * Response body: compatibility list for the SKU.
 */
export type GetProductCompatibilityResponse = {
  /**
   * Compatible vehicles for this inventory item.
   * Occurrence: Always
   */
  compatibleProducts: CompatibleProductGet[];

  /**
   * SKU associated with this compatibility list.
   * Occurrence: Always
   */
  sku: string;
};
