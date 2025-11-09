import type { EbayError } from "@/types/ebay/global/globalEbayTypes";
import type {
  Compatibility,
  CompatibleProduct,
  NameValueList,
  ProductFamilyProperties,
  ProductIdentifier,
} from "../../inventory-api-global-types.js";

/**
 * Path parameters for createOrReplaceProductCompatibility.
 * sku: SKU whose compatibility list will be created/replaced.
 * Occurrence: Required
 */
export type CreateOrReplaceProductCompatibilityPathParams = {
  sku: string;
};

/**
 * Request body for createOrReplaceProductCompatibility.
 * Provide one or more compatible vehicles as name/value pairs, and optional notes.
 */
export type CreateOrReplaceProductCompatibilityRequest = Omit<Compatibility, "sku"> & {
  /**
   * Compatible vehicle list (make/model/year/trim/engine as name/value pairs).
   * Occurrence: Required
   */
  compatibleProducts: Array<
    Omit<CompatibleProduct, "productFamilyProperties" | "productIdentifier"> & {
      /**
       * Vehicle aspects as name/value pairs (e.g., make/model/year/trim/engine).
       * Occurrence: Conditional
       */
      compatibilityProperties?: NameValueList[];

      /**
       * Free-text notes for this compatibility entry.
       * Max Length: 500
       * Occurrence: Optional
       */
      notes?: string;

      /**
       * Deprecated. Do not use; kept for backward compatibility.
       * Occurrence: Conditional (deprecated)
       */
      productFamilyProperties?: ProductFamilyProperties;

      /**
       * Optional identifiers to auto-resolve vehicle (ePID/GTIN/K-Type).
       * Occurrence: Optional
       */
      productIdentifier?: ProductIdentifier;
    }
  >;

  /**
   * Not used in request payload (SKU is in path). Do not send.
   * Included here only by base type; explicitly omitted above.
   */
  // sku?: never;
};

/**
 * Response body (BaseResponse).
 * Warnings/errors triggered by the operation are returned here.
 */
export type CreateOrReplaceProductCompatibilityResponse = {
  /**
   * Warning/error details (V3).
   * Occurrence: Conditional
   */
  warnings?: EbayError[];
};
