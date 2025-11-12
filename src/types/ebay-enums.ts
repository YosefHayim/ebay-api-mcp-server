/**
 * Comprehensive eBay API Enum Definitions
 *
 * This file contains TypeScript enums for common eBay API values.
 * These enums are extracted from eBay's OpenAPI specifications and
 * official developer documentation.
 *
 * Reference: https://developer.ebay.com/api-docs/
 */

/**
 * eBay Marketplace Identifiers
 *
 * Used across multiple APIs to specify which eBay marketplace to target.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/account/types/ba:MarketplaceIdEnum
 */
export enum MarketplaceId {
  /** Austria - https://www.ebay.at */
  EBAY_AT = 'EBAY_AT',

  /** Australia - https://www.ebay.com.au */
  EBAY_AU = 'EBAY_AU',

  /** Belgium - https://www.ebay.be/ */
  EBAY_BE = 'EBAY_BE',

  /** Canada - https://www.ebay.ca */
  EBAY_CA = 'EBAY_CA',

  /** Switzerland - https://www.ebay.ch */
  EBAY_CH = 'EBAY_CH',

  /** China - Reserved for future use */
  EBAY_CN = 'EBAY_CN',

  /** Czech Republic - Reserved for future use */
  EBAY_CZ = 'EBAY_CZ',

  /** Germany - https://www.ebay.de */
  EBAY_DE = 'EBAY_DE',

  /** Denmark - Reserved for future use */
  EBAY_DK = 'EBAY_DK',

  /** Spain - https://www.ebay.es */
  EBAY_ES = 'EBAY_ES',

  /** Finland - Reserved for future use */
  EBAY_FI = 'EBAY_FI',

  /** France - https://www.ebay.fr */
  EBAY_FR = 'EBAY_FR',

  /** United Kingdom - https://www.ebay.co.uk */
  EBAY_GB = 'EBAY_GB',

  /** Greece - Reserved for future use */
  EBAY_GR = 'EBAY_GR',

  /** Hong Kong - https://www.ebay.com.hk */
  EBAY_HK = 'EBAY_HK',

  /** Hungary - Reserved for future use */
  EBAY_HU = 'EBAY_HU',

  /** Indonesia - Reserved for future use */
  EBAY_ID = 'EBAY_ID',

  /** Ireland - https://www.ebay.ie */
  EBAY_IE = 'EBAY_IE',

  /** Israel - Reserved for future use */
  EBAY_IL = 'EBAY_IL',

  /** India - Reserved for future use */
  EBAY_IN = 'EBAY_IN',

  /** Italy - https://www.ebay.it */
  EBAY_IT = 'EBAY_IT',

  /** Japan - Reserved for future use */
  EBAY_JP = 'EBAY_JP',

  /** Malaysia - https://www.ebay.com.my */
  EBAY_MY = 'EBAY_MY',

  /** Netherlands - https://www.ebay.nl */
  EBAY_NL = 'EBAY_NL',

  /** Norway - Reserved for future use */
  EBAY_NO = 'EBAY_NO',

  /** New Zealand - Reserved for future use */
  EBAY_NZ = 'EBAY_NZ',

  /** Peru - Reserved for future use */
  EBAY_PE = 'EBAY_PE',

  /** Philippines - https://www.ebay.ph */
  EBAY_PH = 'EBAY_PH',

  /** Poland - https://www.ebay.pl */
  EBAY_PL = 'EBAY_PL',

  /** Puerto Rico - Reserved for future use */
  EBAY_PR = 'EBAY_PR',

  /** Portugal - Reserved for future use */
  EBAY_PT = 'EBAY_PT',

  /** Russia - Reserved for future use */
  EBAY_RU = 'EBAY_RU',

  /** Sweden - Reserved for future use */
  EBAY_SE = 'EBAY_SE',

  /** Singapore - https://www.ebay.com.sg */
  EBAY_SG = 'EBAY_SG',

  /** Thailand - https://info.ebay.co.th */
  EBAY_TH = 'EBAY_TH',

  /** Taiwan - https://www.ebay.com.tw */
  EBAY_TW = 'EBAY_TW',

  /** United States - https://www.ebay.com */
  EBAY_US = 'EBAY_US',

  /** Vietnam - https://www.ebay.vn */
  EBAY_VN = 'EBAY_VN',

  /** South Africa - Reserved for future use */
  EBAY_ZA = 'EBAY_ZA',

  /** eBay Half.com US - No longer used */
  EBAY_HALF_US = 'EBAY_HALF_US',

  /** eBay Motors US - Parent category for Auto Parts and Vehicles on EBAY_US */
  EBAY_MOTORS_US = 'EBAY_MOTORS_US'
}

/**
 * Item Condition Enums
 *
 * Specifies the condition of an item being listed.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/inventory/types/slr:ConditionEnum
 */
export enum Condition {
  /** Brand-new, unopened item in its original packaging */
  NEW = 'NEW',

  /** Item opened but very lightly used; for trading cards indicates Graded status */
  LIKE_NEW = 'LIKE_NEW',

  /** New, unused item missing original packaging or not sealed */
  NEW_OTHER = 'NEW_OTHER',

  /** New item with defects like scuffs or missing buttons */
  NEW_WITH_DEFECTS = 'NEW_WITH_DEFECTS',

  /** @deprecated Use CERTIFIED_REFURBISHED instead */
  MANUFACTURER_REFURBISHED = 'MANUFACTURER_REFURBISHED',

  /** Pristine, like-new condition inspected and refurbished by manufacturer */
  CERTIFIED_REFURBISHED = 'CERTIFIED_REFURBISHED',

  /** Like new condition, refurbished with minimal wear */
  EXCELLENT_REFURBISHED = 'EXCELLENT_REFURBISHED',

  /** Minimal wear, refurbished by manufacturer or approved vendor */
  VERY_GOOD_REFURBISHED = 'VERY_GOOD_REFURBISHED',

  /** Moderate wear, inspected and refurbished */
  GOOD_REFURBISHED = 'GOOD_REFURBISHED',

  /** Restored to working order by seller or third party */
  SELLER_REFURBISHED = 'SELLER_REFURBISHED',

  /** Used but excellent condition; for apparel means Pre-owned Good */
  USED_EXCELLENT = 'USED_EXCELLENT',

  /** Used but very good condition; for trading cards means Ungraded */
  USED_VERY_GOOD = 'USED_VERY_GOOD',

  /** Used but in good condition */
  USED_GOOD = 'USED_GOOD',

  /** Used item in acceptable condition */
  USED_ACCEPTABLE = 'USED_ACCEPTABLE',

  /** Item not fully functioning; needs repair or parts harvesting */
  FOR_PARTS_OR_NOT_WORKING = 'FOR_PARTS_OR_NOT_WORKING',

  /** Previously owned, excellent condition; apparel categories only */
  PRE_OWNED_EXCELLENT = 'PRE_OWNED_EXCELLENT',

  /** Previously owned with significant visible flaws; apparel only */
  PRE_OWNED_FAIR = 'PRE_OWNED_FAIR'
}

/**
 * Listing Format Types
 *
 * Specifies whether a listing is auction or fixed-price.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/inventory/types/slr:FormatTypeEnum
 */
export enum FormatType {
  /** Auction listing format */
  AUCTION = 'AUCTION',

  /** Fixed-price listing format */
  FIXED_PRICE = 'FIXED_PRICE'
}

/**
 * Order Payment Status
 *
 * Indicates the payment status of an order.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:OrderPaymentStatusEnum
 */
export enum OrderPaymentStatus {
  /** Buyer payment or refund has failed */
  FAILED = 'FAILED',

  /** Full amount of the order has been refunded to the buyer */
  FULLY_REFUNDED = 'FULLY_REFUNDED',

  /** Order has been paid in full. Safe for seller to ship */
  PAID = 'PAID',

  /** Partial amount of the order has been refunded to the buyer */
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',

  /** Buyer payment or seller refund is in pending state */
  PENDING = 'PENDING'
}

/**
 * Marketing Campaign Status
 *
 * Indicates the current status of a Promoted Listings campaign.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/marketing/types/pls:CampaignStatusEnum
 */
export enum CampaignStatus {
  /** Campaign is deleted and no longer accessible */
  DELETED = 'DELETED',

  /** Campaign is inactive and in draft status */
  DRAFT = 'DRAFT',

  /** Campaign has ended and cannot be restarted */
  ENDED = 'ENDED',

  /** Request to end campaign received, system is processing */
  ENDING_SOON = 'ENDING_SOON',

  /** Campaign is paused, listings not being promoted */
  PAUSED = 'PAUSED',

  /** Criterion-based campaign in process of being created */
  PENDING = 'PENDING',

  /** Campaign is active, listings are being promoted */
  RUNNING = 'RUNNING',

  /** Campaign created but scheduled to start on future date */
  SCHEDULED = 'SCHEDULED',

  /** System-generated pause due to seller's Below Standard level */
  SYSTEM_PAUSED = 'SYSTEM_PAUSED'
}

/**
 * Refund Method Types
 *
 * Specifies the refund method for return policies.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/account/types/api:RefundMethodEnum
 */
export enum RefundMethod {
  /** Refund in money back to buyer */
  MONEY_BACK = 'MONEY_BACK',

  /** Refund as merchandise credit */
  MERCHANDISE_CREDIT = 'MERCHANDISE_CREDIT'
}

/**
 * Return Method Types
 *
 * Specifies how returns are handled.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/account/types/api:ReturnMethodEnum
 */
export enum ReturnMethod {
  /** Replacement item provided */
  REPLACEMENT = 'REPLACEMENT',

  /** Item exchange */
  EXCHANGE = 'EXCHANGE'
}

/**
 * Return Shipping Cost Payer
 *
 * Specifies who pays for return shipping.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/account/types/api:ReturnShippingCostPayerEnum
 */
export enum ReturnShippingCostPayer {
  /** Buyer pays for return shipping */
  BUYER = 'BUYER',

  /** Seller pays for return shipping */
  SELLER = 'SELLER'
}

/**
 * Time Duration Units
 *
 * Units for time-based durations used across multiple APIs.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/account/types/ba:TimeDurationUnitEnum
 */
export enum TimeDurationUnit {
  /** Year */
  YEAR = 'YEAR',

  /** Month */
  MONTH = 'MONTH',

  /** Day */
  DAY = 'DAY',

  /** Hour */
  HOUR = 'HOUR',

  /** Calendar day */
  CALENDAR_DAY = 'CALENDAR_DAY',

  /** Business day */
  BUSINESS_DAY = 'BUSINESS_DAY',

  /** Minute */
  MINUTE = 'MINUTE',

  /** Second */
  SECOND = 'SECOND',

  /** Millisecond */
  MILLISECOND = 'MILLISECOND'
}

/**
 * Shipping Cost Types
 *
 * Specifies how shipping costs are calculated.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/account/types/api:ShippingCostTypeEnum
 */
export enum ShippingCostType {
  /** Flat rate shipping */
  FLAT_RATE = 'FLAT_RATE',

  /** Calculated shipping based on weight/dimensions */
  CALCULATED = 'CALCULATED',

  /** Not specified */
  NOT_SPECIFIED = 'NOT_SPECIFIED'
}

/**
 * Shipping Option Types
 *
 * Specifies domestic or international shipping.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/account/types/api:ShippingOptionTypeEnum
 */
export enum ShippingOptionType {
  /** Domestic shipping */
  DOMESTIC = 'DOMESTIC',

  /** International shipping */
  INTERNATIONAL = 'INTERNATIONAL'
}

/**
 * Category Types
 *
 * Specifies eBay category types for business policies.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/account/types/api:CategoryTypeEnum
 */
export enum CategoryType {
  /** All categories */
  ALL_EXCLUDING_MOTORS_VEHICLES = 'ALL_EXCLUDING_MOTORS_VEHICLES',

  /** Motors vehicles category */
  MOTORS_VEHICLES = 'MOTORS_VEHICLES'
}

/**
 * Payment Method Types
 *
 * Specifies available payment methods.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/account/types/api:PaymentMethodTypeEnum
 */
export enum PaymentMethodType {
  /** Credit card payment */
  CREDIT_CARD = 'CREDIT_CARD',

  /** PayPal payment */
  PAYPAL = 'PAYPAL',

  /** Personal check */
  PERSONAL_CHECK = 'PERSONAL_CHECK',

  /** Money order or cashier's check */
  MONEY_ORDER_CASHIERS_CHECK = 'MONEY_ORDER_CASHIERS_CHECK',

  /** Cash on delivery */
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',

  /** Cash on pickup */
  CASH_ON_PICKUP = 'CASH_ON_PICKUP'
}

/**
 * Line Item Fulfillment Status
 *
 * Status of individual line items in an order.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/fulfillment/types/sel:LineItemFulfillmentStatusEnum
 */
export enum LineItemFulfillmentStatus {
  /** Line item has been fulfilled */
  FULFILLED = 'FULFILLED',

  /** In process of fulfillment */
  IN_PROGRESS = 'IN_PROGRESS',

  /** Not started */
  NOT_STARTED = 'NOT_STARTED'
}

/**
 * Offer Status
 *
 * Current status of an inventory offer.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/inventory/types/slr:OfferStatusEnum
 */
export enum OfferStatus {
  /** Offer is published and active */
  PUBLISHED = 'PUBLISHED',

  /** Offer is unpublished */
  UNPUBLISHED = 'UNPUBLISHED'
}

/**
 * Listing Status
 *
 * Current status of a listing.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/inventory/types/slr:ListingStatusEnum
 */
export enum ListingStatus {
  /** Listing is active */
  ACTIVE = 'ACTIVE',

  /** Listing is out of stock */
  OUT_OF_STOCK = 'OUT_OF_STOCK',

  /** Listing has ended */
  ENDED = 'ENDED',

  /** Listing is inactive */
  INACTIVE = 'INACTIVE'
}

/**
 * Compliance Types
 *
 * Types of compliance issues.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/compliance/types/com:ComplianceTypeEnum
 */
export enum ComplianceType {
  /** Product safety compliance */
  PRODUCT_SAFETY = 'PRODUCT_SAFETY',

  /** Product adoption compliance */
  PRODUCT_ADOPTION = 'PRODUCT_ADOPTION',

  /** Product aspects adoption */
  PRODUCT_ASPECTS_ADOPTION = 'PRODUCT_ASPECTS_ADOPTION',

  /** Regulatory compliance */
  REGULATORY = 'REGULATORY',

  /** Returns policy compliance */
  RETURNS_POLICY = 'RETURNS_POLICY'
}

/**
 * Language Codes (ISO 639-1)
 *
 * Two-letter language codes used for content localization.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/inventory/types/slr:LocaleEnum
 */
export enum LanguageCode {
  /** English */
  EN = 'en',

  /** German */
  DE = 'de',

  /** Spanish */
  ES = 'es',

  /** French */
  FR = 'fr',

  /** Italian */
  IT = 'it',

  /** Dutch */
  NL = 'nl',

  /** Polish */
  PL = 'pl',

  /** Portuguese */
  PT = 'pt',

  /** Russian */
  RU = 'ru',

  /** Chinese (Simplified) */
  ZH_CN = 'zh-CN',

  /** Chinese (Traditional) */
  ZH_TW = 'zh-TW',

  /** Japanese */
  JA = 'ja',

  /** Korean */
  KO = 'ko'
}

/**
 * Weight Units of Measure
 *
 * Units for weight measurements.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/inventory/types/slr:WeightUnitOfMeasureEnum
 */
export enum WeightUnit {
  /** Pound */
  POUND = 'POUND',

  /** Kilogram */
  KILOGRAM = 'KILOGRAM',

  /** Ounce */
  OUNCE = 'OUNCE',

  /** Gram */
  GRAM = 'GRAM'
}

/**
 * Length Units of Measure
 *
 * Units for length/dimension measurements.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/inventory/types/slr:LengthUnitOfMeasureEnum
 */
export enum LengthUnit {
  /** Inch */
  INCH = 'INCH',

  /** Feet */
  FEET = 'FEET',

  /** Centimeter */
  CENTIMETER = 'CENTIMETER',

  /** Meter */
  METER = 'METER'
}

/**
 * Currency Codes (ISO 4217)
 *
 * Three-letter currency codes.
 *
 * Reference: https://developer.ebay.com/api-docs/sell/account/types/ba:CurrencyCodeEnum
 */
export enum CurrencyCode {
  /** US Dollar */
  USD = 'USD',

  /** Canadian Dollar */
  CAD = 'CAD',

  /** Euro */
  EUR = 'EUR',

  /** British Pound */
  GBP = 'GBP',

  /** Australian Dollar */
  AUD = 'AUD',

  /** Swiss Franc */
  CHF = 'CHF',

  /** Hong Kong Dollar */
  HKD = 'HKD',

  /** Malaysian Ringgit */
  MYR = 'MYR',

  /** Philippine Peso */
  PHP = 'PHP',

  /** Polish Zloty */
  PLN = 'PLN',

  /** Singapore Dollar */
  SGD = 'SGD',

  /** New Taiwan Dollar */
  TWD = 'TWD',

  /** Thai Baht */
  THB = 'THB',

  /** Japanese Yen */
  JPY = 'JPY'
}

/**
 * Helper functions for working with enums
 */
export const EbayEnums = {
  /**
   * Check if a marketplace ID is valid
   */
  isValidMarketplaceId(id: string): id is MarketplaceId {
    return Object.values(MarketplaceId).includes(id as MarketplaceId);
  },

  /**
   * Check if a condition is valid
   */
  isValidCondition(condition: string): condition is Condition {
    return Object.values(Condition).includes(condition as Condition);
  },

  /**
   * Check if a format type is valid
   */
  isValidFormatType(format: string): format is FormatType {
    return Object.values(FormatType).includes(format as FormatType);
  },

  /**
   * Get all active marketplace IDs (excluding reserved/deprecated)
   */
  getActiveMarketplaces(): MarketplaceId[] {
    return [
      MarketplaceId.EBAY_AT,
      MarketplaceId.EBAY_AU,
      MarketplaceId.EBAY_BE,
      MarketplaceId.EBAY_CA,
      MarketplaceId.EBAY_CH,
      MarketplaceId.EBAY_DE,
      MarketplaceId.EBAY_ES,
      MarketplaceId.EBAY_FR,
      MarketplaceId.EBAY_GB,
      MarketplaceId.EBAY_HK,
      MarketplaceId.EBAY_IE,
      MarketplaceId.EBAY_IT,
      MarketplaceId.EBAY_MY,
      MarketplaceId.EBAY_NL,
      MarketplaceId.EBAY_PH,
      MarketplaceId.EBAY_PL,
      MarketplaceId.EBAY_SG,
      MarketplaceId.EBAY_TH,
      MarketplaceId.EBAY_TW,
      MarketplaceId.EBAY_US,
      MarketplaceId.EBAY_VN,
      MarketplaceId.EBAY_MOTORS_US
    ];
  }
};
