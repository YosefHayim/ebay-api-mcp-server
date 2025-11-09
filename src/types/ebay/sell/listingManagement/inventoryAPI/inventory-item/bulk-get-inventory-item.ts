import type { EbayError } from "../../../../global/globalEbayTypes.js";
import type { InventoryItem } from "../inventory-api-global-types.js";

/**
 * Request payload: up to 25 SKUs.
 */
export type BulkGetInventoryItemRequest = {
  /**
   * Array of SKU objects to retrieve.
   * Occurrence: Always
   */
  requests: BulkGetInventoryItemSku[];
};

/**
 * Single SKU wrapper.
 */
export type BulkGetInventoryItemSku = {
  /**
   * Seller-defined SKU.
   * Occurrence: Always
   */
  sku: string;
};

/**
 * Top-level response container.
 */
export type BulkGetInventoryItemResponse = {
  /**
   * Results for each requested SKU.
   * Occurrence: Always
   */
  responses: BulkGetInventoryItemResult[];
};

/**
 * Per-SKU result.
 */
export type BulkGetInventoryItemResult = {
  /**
   * Seller-defined SKU for this result.
   * Occurrence: Always
   */
  sku: string;

  /**
   * HTTP status for this retrieval.
   * Occurrence: Always
   */
  statusCode: number;

  /**
   * Inventory item details for the SKU.
   * Occurrence: Always
   */
  inventoryItem?: InventoryItem;

  /**
   * Errors related to this SKU retrieval.
   * Occurrence: Conditional
   */
  errors?: EbayError[];

  /**
   * Warnings related to this SKU retrieval.
   * Occurrence: Conditional
   */
  warnings?: EbayError[];
};

/**
 * @summary Bulk Get Inventory Item
 * @description This call retrieves up to 25 inventory item records. The SKU value of each inventory item record to retrieve is specified in the request payload.
 * For those who prefer to retrieve only one inventory item record by SKU value, the getInventoryItem method can be used. To retrieve all inventory item records defined on the seller's account, the getInventoryItems method can be used (with pagination control if desired).
 * @method POST
 * @path /sell/inventory/v1/bulk_get_inventory_item
 * @authentication OAuth access token with scope: https://api.ebay.com/oauth/api_scope/sell.inventory.readonly or https://api.ebay.com/oauth/api_scope/sell.inventory
 * @headers Content-Type: application/json (Required)
 * @body BulkGetInventoryItemRequest
 * @response 200 { "responses": [ { "inventoryItem": { "condition": "NEW", "locale": "en_US", "product": { "title": "GoPro Hero4 Helmet Cam", "description": "New GoPro Hero4 Helmet Cam", "imageUrls": [ "https://i.ebayimg.com/images/g/WJ4AAOSwYcZc-z-e/s-l1600.jpg" ] } }, "sku": "test-sku-1", "statusCode": 200 }, { "inventoryItem": { "condition": "NEW", "locale": "en_US", "product": { "title": "GoPro Hero4 Helmet Cam", "description": "New GoPro Hero4 Helmet Cam", "imageUrls": [ "https://i.ebayimg.com/images/g/WJ4AAOSwYcZc-z-e/s-l1600.jpg" ] } }, "sku": "test-sku-2", "statusCode": 200 } ] }
 * @response 207 { "responses": [ { "inventoryItem": { "condition": "NEW", "locale": "en_US", "product": { "title": "GoPro Hero4 Helmet Cam", "description": "New GoPro Hero4 Helmet Cam", "imageUrls": [ "https://i.ebayimg.com/images/g/WJ4AAOSwYcZc-z-e/s-l1600.jpg" ] } }, "sku": "test-sku-1", "statusCode": 200 }, { "errors": [ { "category": "REQUEST", "domain": "API_INVENTORY", "errorId": 25707, "longMessage": "Invalid sku. sku has to be alphanumeric with upto 50 characters in length", "message": "Invalid sku", "parameters": [ { "name": "additionalInfo", "value": "sku has to be alphanumeric with upto 50 characters in length" } ] } ], "sku": "invalid-sku!", "statusCode": 400 } ] }
 * @response 400 { "errors": [ { "category": "REQUEST", "domain": "API_INVENTORY", "errorId": 25727, "longMessage": "The number of InventoryItems in the request cannot exceed 25.", "message": "The number of InventoryItems in the request cannot exceed 25.", "parameters": [ { "name": "additionalInfo", "value": "25" } ] } ] }
 * @response 500 { "errors": [ { "category": "SYSTEM", "domain": "API_INVENTORY", "errorId": 25001, "longMessage": "Any System error. {additionalInfo}", "message": "Any System error.", "parameters": [ { "name": "additionalInfo", "value": "Internal server error" } ] } ] }
 * @error 25001 API_INVENTORY APPLICATION Any System error. {additionalInfo}
 * @error 25702 API_INVENTORY REQUEST SKU {additionalInfo} is not available in the system
 * @error 25708 API_INVENTORY REQUEST Invalid SKU.
 * @error 25709 API_INVENTORY REQUEST Invalid request. Invalid value for field {additionalInfo}
 * @error 25710 API_INVENTORY REQUEST We didn't find the resource/entity you are requesting. Please verify the request
 * @error 25727 API_INVENTORY REQUEST The number of InventoryItems in the request cannot exceed {additionalInfo}.
 * @error 25734 API_INVENTORY REQUEST SKU should be unique in the request.
 */
export type BulkGetInventoryItemAPI = {
  method: "POST";
  path: "/sell/inventory/v1/bulk_get_inventory_item";
  payload: {
    requests: {
      sku: string;
    }[];
  };
  response: {
    responses: {
      errors?: EbayError[];
      inventoryItem?: InventoryItem;
      sku: string;
      statusCode: number;
      warnings?: EbayError[];
    }[];
  };
};
