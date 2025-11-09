import type { Amount, EbayError } from "@/types/ebay/global/globalEbayTypes";
import type { ShipToLocationAvailability } from "../../inventory-api-global-types.js";

/**
 * Request payload: update price/quantity for a single SKU and/or its offers.
 * Occurrence: Required
 */
export type BulkUpdatePriceQuantityRequest = {
  /**
   * Up to 25 entries; each targets one SKU (product).
   * Occurrence: Required
   */
  requests: PriceQuantity[];
};

/**
 * Per-SKU update block.
 */
export type PriceQuantity = {
  /**
   * Price/quantity updates for published offers of this SKU.
   * A separate node per offer being updated.
   * Occurrence: Conditional
   */
  offers?: OfferPriceQuantity[];

  /**
   * Total ship-to-home quantity, optionally distributed by locations.
   * Occurrence: Conditional
   */
  shipToLocationAvailability?: ShipToLocationAvailability;

  /**
   * SKU for which ship-to-home quantity is updated.
   * Required when shipToLocationAvailability is provided.
   * Occurrence: Conditional
   * Max Length: 50
   */
  sku?: string;
};

/**
 * Offer-level price/quantity update.
 */
export type OfferPriceQuantity = {
  /**
   * Marketplace-allocated available quantity for this offer.
   * Either this or price is required in each offer node.
   * Occurrence: Conditional
   */
  availableQuantity?: number;

  /**
   * Target offer identifier to update.
   * Occurrence: Conditional
   */
  offerId?: string;

  /**
   * New price for this offer.
   * Either this or availableQuantity is required.
   * Occurrence: Conditional
   */
  price?: Amount;
};

/**
 * Response payload: per-offer/SKU update results.
 * Occurrence: Always
 */
export type BulkUpdatePriceQuantityResponse = {
  /**
   * One result per attempted offer/SKU update.
   * Occurrence: Always
   */
  responses: PriceQuantityResponse[];
};

/**
 * Per-offer/SKU update result.
 */
export type PriceQuantityResponse = {
  /**
   * Errors for this offer/SKU update, if any.
   * Occurrence: Conditional
   */
  errors?: EbayError[];

  /**
   * Updated offer identifier.
   * Not returned when only SKU-level quantity was updated.
   * Occurrence: Conditional
   */
  offerId?: string;

  /**
   * SKU associated with the update attempt.
   * Occurrence: Always
   * Max Length: 50
   */
  sku: string;

  /**
   * HTTP status of the update attempt (e.g., 200 on success).
   * Occurrence: Always
   */
  statusCode: number;

  /**
   * Warnings for this offer/SKU update, if any.
   * Occurrence: Conditional
   */
  warnings?: EbayError[];
};

/**
 * @summary Bulk Update Price Quantity
 * @description This call is used by the seller to update the total ship-to-home quantity of one inventory item, and/or to update the price and/or quantity of one or more offers associated with one inventory item. Up to 25 offers associated with an inventory item may be updated with one bulkUpdatePriceQuantity call. Only one SKU (one product) can be updated per call.
 *
 * Note: Each listing can be revised up to 250 times in one calendar day. If this revision threshold is reached, the seller will be blocked from revising the item until the next calendar day.
 *
 * Note: In addition to the authorization header, which is required for all Inventory API calls, this call also requires the Content-Type header. See the HTTP request headers for more information.
 *
 * The getOffers call can be used to retrieve all offers associated with a SKU. The seller will just pass in the correct SKU value through the sku query parameter. To update an offer, the offerId value is required, and this value is returned in the getOffers call response. It is also useful to know which offers are unpublished and which ones are published. To get this status, look for the status value in the getOffers call response. Offers in the published state are live eBay listings, and these listings will be revised with a successful bulkUpdatePriceQuantity call.
 *
 * An issue will occur if duplicate offerId values are passed through the same offers container, or if one or more of the specified offers are associated with different products/SKUs.
 *
 * Note: For multiple-variation listings, it is recommended that the bulkUpdatePriceQuantity call be used to update price and quantity information for each SKU within that multiple-variation listing instead of using createOrReplaceInventoryItem calls to update the price and quantity for each SKU. Just remember that only one SKU (one product variation) can be updated per call.
 * @method POST
 * @path /sell/inventory/v1/bulk_update_price_quantity
 * @authentication OAuth access token with scope: https://api.ebay.com/oauth/api_scope/sell.inventory
 * @headers Content-Type: application/json (Required)
 * @body BulkUpdatePriceQuantityRequest
 * @response 200 { "responses": [ { "offerId": "123456789", "sku": "G********1", "statusCode": 200 }, { "offerId": "987654321", "sku": "G********2", "statusCode": 200 }, { "offerId": "112233445", "sku": "G********3", "statusCode": 200 } ] }
 * @response 207 { "responses": [ { "offerId": "123456789", "sku": "G********1", "statusCode": 200 }, { "errors": [ { "category": "REQUEST", "domain": "API_INVENTORY", "errorId": 25709, "longMessage": "Invalid value for field: availableQuantity. The value must be greater than or equal to 0.", "message": "Invalid value for availableQuantity", "parameters": [ { "name": "additionalInfo", "value": "availableQuantity" } ] } ], "offerId": "987654321", "sku": "G********2", "statusCode": 400 } ] }
 * @response 400 { "errors": [ { "category": "REQUEST", "domain": "API_INVENTORY", "errorId": 25002, "longMessage": "Any User error. {additionalInfo}", "message": "Any User error.", "parameters": [ { "name": "additionalInfo", "value": "Invalid request" } ] } ] }
 * @response 500 { "errors": [ { "category": "SYSTEM", "domain": "API_INVENTORY", "errorId": 25001, "longMessage": "Any System error. {additionalInfo}", "message": "Any System error.", "parameters": [ { "name": "additionalInfo", "value": "Internal server error" } ] } ] }
 * @error 25001 API_INVENTORY APPLICATION A system error has occurred. {additionalInfo}
 * @error 25002 API_INVENTORY REQUEST Any User error. {additionalInfo}
 * @error 25709 API_INVENTORY REQUEST Invalid value for {fieldName}. {additionalInfo}
 * @error 25759 API_INVENTORY REQUEST shipToLocationAvailability quantity value should be greater than or equal to auction allocation. Please provide valid quantity or unpublish auction offers of the sku.
 */
export type BulkUpdatePriceQuantityAPI = {
  method: "POST";
  path: "/sell/inventory/v1/bulk_update_price_quantity";
  payload: {
    requests: {
      offers?: {
        availableQuantity?: number;
        offerId?: string;
        price?: Amount;
      }[];
      shipToLocationAvailability?: ShipToLocationAvailability;
      sku?: string;
    }[];
  };
  response: {
    responses: {
      errors?: EbayError[];
      offerId?: string;
      sku: string;
      statusCode: number;
      warnings?: EbayError[];
    }[];
  };
};
