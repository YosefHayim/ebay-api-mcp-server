export enum ProgramTypeEnum {
  OUT_OF_STOCK_CONTROL = "OUT_OF_STOCK_CONTROL",
  PARTNER_MOTORS_DEALER = "PARTNER_MOTORS_DEALER",
  SELLING_POLICY_MANAGEMENT = "SELLING_POLICY_MANAGEMENT",
}

/** Package type values for shipping containers */
export enum PackageTypeEnum {
  LETTER = "LETTER",
  BULKY_GOODS = "BULKY_GOODS",
  CARAVAN = "CARAVAN",
  CARS = "CARS",
  EUROPALLET = "EUROPALLET",
  EXPANDABLE_TOUGH_BAGS = "EXPANDABLE_TOUGH_BAGS",
  EXTRA_LARGE_PACK = "EXTRA_LARGE_PACK",
  FURNITURE = "FURNITURE",
  INDUSTRY_VEHICLES = "INDUSTRY_VEHICLES",
  LARGE_CANADA_POSTBOX = "LARGE_CANADA_POSTBOX",
  LARGE_CANADA_POST_BUBBLE_MAILER = "LARGE_CANADA_POST_BUBBLE_MAILER",
  LARGE_ENVELOPE = "LARGE_ENVELOPE",
  MAILING_BOX = "MAILING_BOX",
  MEDIUM_CANADA_POST_BOX = "MEDIUM_CANADA_POST_BOX",
  MEDIUM_CANADA_POST_BUBBLE_MAILER = "MEDIUM_CANADA_POST_BUBBLE_MAILER",
  MOTORBIKES = "MOTORBIKES",
  ONE_WAY_PALLET = "ONE_WAY_PALLET",
  PACKAGE_THICK_ENVELOPE = "PACKAGE_THICK_ENVELOPE",
  PADDED_BAGS = "PADDED_BAGS",
  PARCEL_OR_PADDED_ENVELOPE = "PARCEL_OR_PADDED_ENVELOPE",
  ROLL = "ROLL",
  SMALL_CANADA_POST_BOX = "SMALL_CANADA_POST_BOX",
  SMALL_CANADA_POST_BUBBLE_MAILER = "SMALL_CANADA_POST_BUBBLE_MAILER",
  TOUGH_BAGS = "TOUGH_BAGS",
  UPS_LETTER = "UPS_LETTER",
  USPS_FLAT_RATE_ENVELOPE = "USPS_FLAT_RATE_ENVELOPE",
  USPS_LARGE_PACK = "USPS_LARGE_PACK",
  VERY_LARGE_PACK = "VERY_LARGE_PACK",
  WINE_PAK = "WINE_PAK",
}

/** Weight units for shipping */
export enum WeightUnitOfMeasureEnum {
  POUND = "POUND",
  KILOGRAM = "KILOGRAM",
  OUNCE = "OUNCE",
  GRAM = "GRAM",
}

export enum CurrencyCodeEnum {
  AFN = "AFN",
  ALL = "ALL",
  AMD = "AMD",
  ANG = "ANG",
  AOA = "AOA",
  ARS = "ARS",
  AUD = "AUD",
  AWG = "AWG",
  AZN = "AZN",
  BAM = "BAM",
  BBD = "BBD",
  BDT = "BDT",
  BGN = "BGN",
  BHD = "BHD",
  BIF = "BIF",
  BMD = "BMD",
  BND = "BND",
  BOB = "BOB",
  BRL = "BRL",
  BSD = "BSD",
  BTN = "BTN",
  BWP = "BWP",
  BYR = "BYR",
  BZD = "BZD",
  CAD = "CAD",
  CDF = "CDF",
  CHF = "CHF",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  CRC = "CRC",
  CUP = "CUP",
  CVE = "CVE",
  CZK = "CZK",
  DJF = "DJF",
  DKK = "DKK",
  DOP = "DOP",
  DZD = "DZD",
  EGP = "EGP",
  ERN = "ERN",
  ETB = "ETB",
  EUR = "EUR",
  FJD = "FJD",
  FKP = "FKP",
  GBP = "GBP",
  GEL = "GEL",
  GHS = "GHS",
  GIP = "GIP",
  GMD = "GMD",
  GNF = "GNF",
  GTQ = "GTQ",
  GYD = "GYD",
  HKD = "HKD",
  HNL = "HNL",
  HRK = "HRK",
  HTG = "HTG",
  HUF = "HUF",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
}

export enum ShippingCostTypeEnum {
  CALCULATED = "CALCULATED",
  FLAT_RATE = "FLAT_RATE",
  NOT_SPECIFIED = "NOT_SPECIFIED",
}

export enum ShippingOptionTypeEnum {
  DOMESTIC = "DOMESTIC",
  INTERNATIONAL = "INTERNATIONAL",
  NOT_SPECIFIED = "NOT_SPECIFIED",
}

/** Time duration units (SLA granularity) */
export enum TimeDurationUnitEnum {
  YEAR = "YEAR",
  MONTH = "MONTH",
  DAY = "DAY",
  HOUR = "HOUR",
  CALENDAR_DAY = "CALENDAR_DAY",
  BUSINESS_DAY = "BUSINESS_DAY",
  MINUTE = "MINUTE",
  SECOND = "SECOND",
  MILLISECOND = "MILLISECOND",
}

/** Inventory availability type for pickup locations */
export enum AvailabilityTypeEnum {
  /** On hand and available now */
  IN_STOCK = "IN_STOCK",
  /** None available at the moment */
  OUT_OF_STOCK = "OUT_OF_STOCK",
  /** Ship to store prior to pickup */
  SHIP_TO_STORE = "SHIP_TO_STORE",
}

/** Item condition values supported by eBay */
export enum ConditionEnum {
  NEW = "NEW",
  LIKE_NEW = "LIKE_NEW",
  NEW_OTHER = "NEW_OTHER",
  NEW_WITH_DEFECTS = "NEW_WITH_DEFECTS",
  MANUFACTURER_REFURBISHED = "MANUFACTURER_REFURBISHED",
  CERTIFIED_REFURBISHED = "CERTIFIED_REFURBISHED",
  EXCELLENT_REFURBISHED = "EXCELLENT_REFURBISHED",
  VERY_GOOD_REFURBISHED = "VERY_GOOD_REFURBISHED",
  GOOD_REFURBISHED = "GOOD_REFURBISHED",
  SELLER_REFURBISHED = "SELLER_REFURBISHED",
  USED_EXCELLENT = "USED_EXCELLENT",
  USED_VERY_GOOD = "USED_VERY_GOOD",
  USED_GOOD = "USED_GOOD",
  USED_ACCEPTABLE = "USED_ACCEPTABLE",
  FOR_PARTS_OR_NOT_WORKING = "FOR_PARTS_OR_NOT_WORKING",
  PRE_OWNED_EXCELLENT = "PRE_OWNED_EXCELLENT",
  PRE_OWNED_FAIR = "PRE_OWNED_FAIR",
}

export type Amount = {
  currency: string;
  value: string;
};

/**
 * Error and warning structure (V3).
 */
export type EbayError = {
  /**
   * Error category: request, application, or system.
   * Occurrence: Conditional
   */
  category?: string;

  /**
   * Domain of the error/warning.
   * Occurrence: Conditional
   */
  domain?: string;

  /**
   * Unique error/warning code.
   * Occurrence: Conditional
   */
  errorId: number;

  /**
   * Request element refs most associated with this issue.
   * Occurrence: Conditional
   */
  inputRefIds?: string[];

  /**
   * Detailed description and guidance.
   * Occurrence: Conditional
   */
  longMessage?: string;

  /**
   * Short description of the issue.
   * Occurrence: Conditional
   */
  message: string;

  /**
   * Response element refs associated with this issue.
   * Occurrence: Conditional
   */
  outputRefIds?: string[];

  /**
   * Context parameters contributing to the issue.
   * Occurrence: Conditional
   */
  parameters?: Array<{
    /**
     * Name of the parameter.
     * Occurrence: Conditional
     */
    name: string;

    /**
     * Value passed for the parameter.
     * Occurrence: Conditional
     */
    value: string;
  }>;

  /**
   * Subdomain of the error/warning.
   * Occurrence: Conditional
   */
  subdomain?: string;
};

/** Length units for physical dimensions */
export enum LengthUnitOfMeasureEnum {
  INCH = "INCH",
  FEET = "FEET",
  CENTIMETER = "CENTIMETER",
  METER = "METER",
}

/** Listing locales (language/region) */
export enum LocaleEnum {
  en_US = "en-US",
  en_CA = "en-CA",
  fr_CA = "fr-CA",
  en_GB = "en-GB",
  en_AU = "en-AU",
  en_IN = "en-IN",
  de_AT = "de-AT",
  fr_BE = "fr-BE",
  fr_FR = "fr-FR",
  de_DE = "de-DE",
  it_IT = "it-IT",
  nl_BE = "nl-BE",
  nl_NL = "nl-NL",
  es_ES = "es-ES",
  de_CH = "de-CH",
  fi_FI = "fi-FI",
  zh_HK = "zh-HK",
  hu_HU = "hu-HU",
  en_PH = "en-PH",
  pl_PL = "pl-PL",
  pt_PT = "pt-PT",
  ru_RU = "ru-RU",
  en_SG = "en-SG",
  en_IE = "en-IE",
  en_MY = "en-MY",
}

/** eBay marketplace IDs (string enum of site codes) */
export enum EbayMarketplaceIdEnum {
  AT = "EBAY_AT",
  AU = "EBAY_AU",
  BE = "EBAY_BE",
  CA = "EBAY_CA",
  CH = "EBAY_CH",
  CN = "EBAY_CN",
  CZ = "EBAY_CZ",
  DE = "EBAY_DE",
  DK = "EBAY_DK",
  ES = "EBAY_ES",
  FI = "EBAY_FI",
  FR = "EBAY_FR",
  GB = "EBAY_GB",
  GR = "EBAY_GR",
  HK = "EBAY_HK",
  HU = "EBAY_HU",
  ID = "EBAY_ID",
  IE = "EBAY_IE",
  IL = "EBAY_IL",
  IN = "EBAY_IN",
  IT = "EBAY_IT",
  JP = "EBAY_JP",
  MY = "EBAY_MY",
  NL = "EBAY_NL",
  US = "EBAY_US",
}

/* Inventory API error */
export enum InventoryErrorCodeEnum {
  // Errors
  /** A system error occurred. */
  E25001 = 25_001,
  /** A user error occurred. */
  E25002 = 25_002,
  /** Invalid price. */
  E25003 = 25_003,
  /** Invalid quantity. */
  E25004 = 25_004,
  /** Invalid category ID. */
  E25005 = 25_005,
  /** Invalid listing option. */
  E25006 = 25_006,
  /** Invalid Fulfillment policy data. */
  E25007 = 25_007,
  /** Invalid Payment policy data. */
  E25008 = 25_008,
  /** Invalid Return policy data. */
  E25009 = 25_009,
  /** Invalid tax information. */
  E25011 = 25_011,
  /** Invalid inventory location. */
  E25012 = 25_012,
  /** Invalid data in Inventory Item Group (see docs). */
  E25013 = 25_013,
  /** Invalid picture(s). */
  E25014 = 25_014,
  /** Invalid picture URL. */
  E25015 = 25_015,
  /** Field value invalid (see details). */
  E25016 = 25_016,
  /** Missing information in fields (see docs). */
  E25017 = 25_017,
  /** Incomplete account information (see docs). */
  E25018 = 25_018,
  /** Cannot revise the listing (see docs). */
  E25019 = 25_019,
  /** Invalid shipping package details. */
  E25020 = 25_020,
  /** Invalid item condition information. */
  E25021 = 25_021,
  /** Invalid attribute. */
  E25022 = 25_022,
  /** Invalid compatibility information. */
  E25023 = 25_023,
  /** Concurrent access not allowed; retry later. */
  E25025 = 25_025,
  /** Selling limit exceeded. */
  E25026 = 25_026,
  /** {field} required for this category. */
  E25029 = 25_029,
  /** {field} must be a number between {min} and {max}. */
  E25031 = 25_031,
  /** Only {max} policies can be specified. */
  E25034 = 25_034,
  /** Policy not found for marketplace. */
  E25035 = 25_035,
  /** Policy type mismatch. */
  E25036 = 25_036,
  /** Item cannot be revised (bid/best offer/ending soon). */
  E25038 = 25_038,
  /** Item cannot be revised (bid/best offer + <12h). */
  E25039 = 25_039,
  /** Item cannot be revised (bid/best offer + <12h). */
  E25040 = 25_040,
  /** Refurbished: max handling time requirement. */
  E25041 = 25_041,
  /** Refurbished: free shipping required. */
  E25042 = 25_042,
  /** Refurbished: returns must be accepted. */
  E25043 = 25_043,
  /** Refurbished: refund must be Money Back. */
  E25044 = 25_044,
  /** Refurbished: minimum return window requirement. */
  E25045 = 25_045,
  /** Refurbished: seller pays return shipping. */
  E25046 = 25_046,
  /** Not eligible to use Refurbished condition. */
  E25047 = 25_047,
  /** Not eligible to use Refurbished in this category. */
  E25048 = 25_048,
  /** Not eligible to use Refurbished for the brand. */
  E25049 = 25_049,
  /** Refurbished: forbidden term in Title. */
  E25050 = 25_050,
  /** Refurbished: forbidden term in Subtitle. */
  E25051 = 25_051,
  /** Refurbished: minimum number of images required. */
  E25052 = 25_052,
  /** IDs not found. */
  E25076 = 25_076,
  /** Duplicate Regulatory IDs ignored. */
  E25077 = 25_077,
  /** Hazmat structure incorrect. */
  E25078 = 25_078,
  /** Repair score invalid (range/precision). */
  E25079 = 25_079,
  /** Field length exceeds limit. */
  E25080 = 25_080,
  /** Hazmat info incomplete (statements missing). */
  E25081 = 25_081,
  /** Energy efficiency image missing. */
  E25083 = 25_083,
  /** Missing energy label and product info sheet. */
  E25084 = 25_084,
  /** URL must be eBay Picture Service URL. */
  E25086 = 25_086,
  /** Email formatted incorrectly. */
  E25088 = 25_088,
  /** Too many global compliance policies. */
  E25089 = 25_089,
  /** Too many compliance policies per region. */
  E25090 = 25_090,
  /** Too many total compliance policies. */
  E25091 = 25_091,
  /** Too many global takeback policies. */
  E25092 = 25_092,
  /** Too many regional takeback policies. */
  E25093 = 25_093,
  /** Too many total takeback policies. */
  E25094 = 25_094,
  /** Invalid region for regional custom policy. */
  E25095 = 25_095,
  /** Listing on hold; revisions not possible. */
  E25097 = 25_097,
  /** Transaction blocked due to parent listing on-hold. */
  E25098 = 25_098,
  /** Regulatory IDs not found. */
  E25104 = 25_104,
  /** Regulatory document structure incorrect (max entries). */
  E25106 = 25_106,
  /** Invalid document state (must be SUBMITTED/ACCEPTED). */
  E25107 = 25_107,
  /** Product Safety structure incorrect (max entries). */
  E25108 = 25_108,
  /** Product safety info incomplete (pictograms/statements). */
  E25109 = 25_109,
  /** Manufacturer address incomplete. */
  E25110 = 25_110,
  /** Manufacturer company name missing. */
  E25111 = 25_111,
  /** Responsible Person structure incorrect (max entries). */
  E25112 = 25_112,
  /** Responsible Person address incomplete. */
  E25113 = 25_113,
  /** Responsible Person company name missing. */
  E25114 = 25_114,
  /** Manufacturer or one Responsible Person must be in EU. */
  E25115 = 25_115,
  /** Responsible Person type count out of range. */
  E25116 = 25_116,
  /** Manufacturer contact: provide at least one channel. */
  E25118 = 25_118,
  /** Responsible Person contact: provide at least one channel. */
  E25119 = 25_119,
  /** Category uses catalog data; leave key field blank. */
  E25120 = 25_120,
  /** Category requires adopting eBay catalog data. */
  E25121 = 25_121,
  /** Contact URL formatted incorrectly. */
  E25122 = 25_122,
  /** P&A: non-compliant domestic return policy. */
  E25123 = 25_123,
  /** Invalid picture. */
  E25501 = 25_501,
  /** Invalid attribute information. */
  E25502 = 25_502,
  /** Invalid product information. */
  E25503 = 25_503,
  /** Invalid attribute (fieldName). */
  E25601 = 25_601,
  /** Input error (see details). */
  E25604 = 25_604,
  /** One or more SKUs not found. */
  E25701 = 25_701,
  /** SKU not found/unavailable. */
  E25702 = 25_702,
  /** SKU invalid: only alphanumerics, <= 50 chars. */
  E25707 = 25_707,
  /** Invalid SKU. */
  E25708 = 25_708,
  /** Invalid value for field. */
  E25709 = 25_709,
  /** Resource not found (verify request). */
  E25710 = 25_710,
  /** Offer not available. */
  E25713 = 25_713,
  /** Invalid dimensions and/or weight. */
  E25715 = 25_715,
  /** listingStartDate invalid. */
  E25752 = 25_752,
  /** shipTo quantity < auction allocation. */
  E25759 = 25_759,
  /** Parent listing on-hold blocks transaction. */
  E25759_DUP = 257_591, // kept distinct to avoid enum key clash; value not reused
  /** shipTo quantity insufficient for auction listings. */
  E25760 = 25_760,
  /** takeBackPolicyId must be long. */
  E25766 = 25_766,
  /** productCompliancePolicyId must be long. */
  E25767 = 25_767,

  // Warnings
  /** Listing is on hold; you may revise to resolve. */
  W25096 = 25_096,
  /** P&A policy auto-updated to 30d + seller-paid returns. */
  W25124 = 25_124,
  /** Invalid listing format removed. */
  W25401 = 25_401,
  /** System warning. */
  W25402 = 25_402,
  /** Service warning. */
  W25504 = 25_504,
  /** listingStartDate in past or offer live; not updated. */
  W25753 = 25_753,
}

/* Helper: map error code → brief meaning (for tooltips/logging). */
export const InventoryErrorSummary: Record<number, string> = {
  25001: "System error",
  25002: "User/request error",
  25003: "Invalid price",
  25004: "Invalid quantity",
  25005: "Invalid category ID",
  25006: "Invalid listing option",
  25007: "Invalid Fulfillment policy",
  25008: "Invalid Payment policy",
  25009: "Invalid Return policy",
  25011: "Invalid tax information",
  25012: "Invalid inventory location",
  25013: "Invalid Inventory Item Group data",
  25014: "Invalid pictures",
  25015: "Invalid picture URL",
  25016: "Invalid field value",
  25017: "Missing required info",
  25018: "Incomplete account information",
  25019: "Cannot revise listing",
  25020: "Invalid shipping package details",
  25021: "Invalid item condition info",
  25022: "Invalid attribute",
  25023: "Invalid compatibility info",
  25025: "Concurrent access not allowed",
  25026: "Selling limit exceeded",
  25029: "Field required for category",
  25031: "Field out of numeric range",
  25034: "Too many policies",
  25035: "Policy not found for marketplace",
  25036: "Policy type mismatch",
  25038: "Cannot revise: bid/BO/<12h",
  25039: "Cannot revise: bid/BO/<12h",
  25040: "Cannot revise: bid/BO/<12h",
  25041: "Refurbished: handling time requirement",
  25042: "Refurbished: free shipping required",
  25043: "Refurbished: returns required",
  25044: "Refurbished: refund must be Money Back",
  25045: "Refurbished: min return window",
  25046: "Refurbished: seller pays return shipping",
  25047: "Not eligible for Refurbished",
  25048: "Not eligible (category) for Refurbished",
  25049: "Not eligible (brand) for Refurbished",
  25050: "Refurbished: forbidden Title term",
  25051: "Refurbished: forbidden Subtitle term",
  25052: "Refurbished: min images required",
  25076: "IDs not found",
  25077: "Duplicate Regulatory IDs",
  25078: "Hazmat structure incorrect",
  25079: "Repair score invalid",
  25080: "Field length exceeded",
  25081: "Hazmat statements missing",
  25083: "Energy efficiency image missing",
  25084: "Energy label and info sheet required",
  25086: "Must use eBay Picture Service URL",
  25088: "Email formatted incorrectly",
  25089: "Too many global compliance policies",
  25090: "Too many regional compliance policies",
  25091: "Too many total compliance policies",
  25092: "Too many global takeback policies",
  25093: "Too many regional takeback policies",
  25094: "Too many total takeback policies",
  25095: "Invalid region for custom policy",
  25097: "Listing on hold; no revisions",
  25098: "Transaction blocked: parent on-hold",
  25104: "Regulatory document IDs not found",
  25106: "Regulatory document max entries exceeded",
  25107: "Invalid document state",
  25108: "Product Safety max entries exceeded",
  25109: "Product safety info incomplete",
  25110: "Manufacturer address incomplete",
  25111: "Manufacturer company missing",
  25112: "Responsible Person max entries exceeded",
  25113: "Responsible Person address incomplete",
  25114: "Responsible Person company missing",
  25115: "Manufacturer/Responsible Person must be in EU",
  25116: "Responsible Person types out of range",
  25118: "Manufacturer contact: add address/email/url/phone",
  25119: "Responsible Person contact: add address/email/url/phone",
  25120: "Category uses catalog key data; leave blank",
  25121: "Category requires eBay catalog data",
  25122: "Contact URL formatted incorrectly",
  25123: "P&A return policy non-compliant",
  25501: "Invalid picture",
  25502: "Invalid attribute information",
  25503: "Invalid product information",
  25601: "Invalid attribute (fieldName)",
  25604: "Input error",
  25701: "SKU(s) not found",
  25702: "SKU not found/unavailable",
  25707: "SKU invalid format",
  25708: "Invalid SKU",
  25709: "Invalid field value",
  25710: "Resource not found",
  25713: "Offer not available",
  25715: "Invalid dimensions/weight",
  25752: "listingStartDate invalid",
  25759: "ship-to qty < auction allocation",
  25760: "ship-to qty insufficient for auctions",
  25766: "takeBackPolicyId must be long",
  25767: "productCompliancePolicyId must be long",
  // Warnings
  25096: "Listing on hold; you may revise",
  25124: "P&A return policy auto-updated",
  25401: "Invalid listing format removed",
  25402: "System warning",
  25504: "Service warning",
  25753: "listingStartDate in past/live; not updated",
};

/**
 * PackageWeightAndSize
 * Indicates package type, weight, and dimensions for shipping.
 * Required for calculated shipping (weight and dimensions). For flat-rate with weight surcharge, weight alone is required.
 */
export type PackageWeightAndSize = {
  /**
   * Dimensions of the shipping package. Required when dimensions are specified for calculated shipping.
   */
  dimensions?: Dimension;

  /**
   * Type of shipping package.
   */
  packageType?: PackageTypeEnum;

  /**
   * True if the package is irregular and requires special handling (calculated shipping only).
   */
  shippingIrregular?: boolean;

  /**
   * Weight of the shipping package. Required for calculated shipping or flat-rate with surcharge.
   */
  weight?: Weight;
};

/**
 * Dimension
 * Physical dimensions of a shipping package.
 */
export type Dimension = {
  /**
   * Height of the package in the specified unit.
   */
  height: number;

  /**
   * Length of the package in the specified unit.
   */
  length: number;

  /**
   * Unit of measure for dimensions.
   */
  unit: LengthUnitOfMeasureEnum;

  /**
   * Width of the package in the specified unit.
   */
  width: number;
};

/**
 * Weight
 * Numeric weight with unit.
 */
export type Weight = {
  unit: WeightUnitOfMeasureEnum;
  value: number;
};
