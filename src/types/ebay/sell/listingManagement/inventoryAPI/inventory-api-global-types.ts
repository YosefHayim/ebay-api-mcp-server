import type {
  AvailabilityTypeEnum,
  ConditionEnum,
  EbayMarketplaceIdEnum,
  LocaleEnum,
  TimeDurationUnitEnum,
} from "@/types/ebay/global/global-ebay-types";
import type { PackageWeightAndSize } from "./inventory-item/bulk-create-or-replace-inventory-item.js";
import type {
  Charity,
  ExtendedProducerResponsibility,
  ListingPolicies,
  PricingSummary,
  Regulatory,
  Tax,
} from "./offer/bulk-create-offer.js";

/**
 * Single offer definition used in bulk_create_offer.
 */
export type EbayOfferDetailsWithKeys = {
  /**
   * Seller-defined SKU of the inventory item to list.
   * Must be unique per (sku, marketplaceId, format).
   * Max length: 50.
   * Required by the method.
   */
  sku: string;

  /**
   * Target eBay marketplace (e.g., EBAY_US).
   * Required by the method.
   */
  marketplaceId: EbayMarketplace;

  /**
   * Listing format. Supported: "FIXED_PRICE" | "AUCTION".
   * Required by the method.
   */
  format: FormatTypeEnum;

  /**
   * Merchant inventory location key where the item is stocked.
   * Required before publish (an offer must be tied to a location).
   * Max length: 36.
   */
  merchantLocationKey?: string;

  /**
   * Offer-level available quantity for this SKU on the marketplace.
   * For auctions, must be 1 and generally not applicable (see docs).
   * Overrides inventory-item quantity for the listing.
   * Required before publish if quantity not otherwise provided.
   */
  availableQuantity?: number;

  /**
   * Primary eBay category ID.
   * Required before publish.
   * Use Taxonomy.getCategorySuggestions to find candidates.
   */
  categoryId?: string;

  /**
   * Secondary category ID (fees may apply; some categories disallow).
   * Optional.
   */
  secondaryCategoryId?: string;

  /**
   * Pricing, MAP, STP, and auction price fields.
   * Price is required before publish.
   */
  pricingSummary?: PricingSummary;

  /**
   * Listing/business/custom policies (payment/fulfillment/return, etc.).
   * Payment/fulfillment/return are required before publish.
   */
  listingPolicies?: ListingPolicies;

  /**
   * Listing duration.
   * For fixed price: "GTC".
   * For auction: DAYS_1|3|5|7|10 (required for auction).
   * Required before publish for auction listings.
   */
  listingDuration?: ListingDurationEnum;

  /**
   * Listing description (HTML allowed; counts toward length).
   * If omitted, inherits from inventory item (or group) description.
   * Required before publish if not inherited elsewhere.
   * Max length: 500,000 chars (incl. markup).
   */
  listingDescription?: string;

  // ---------- Optional fields ----------

  /**
   * Whether to apply eBay Catalog details from product identifiers.
   * Defaults to true if omitted.
   */
  includeCatalogProductDetails?: boolean;

  /**
   * UTC timestamp when the listing should start after publish.
   * Example: "2025-05-30T19:08:00Z".
   * Optional. If omitted, starts immediately after publish.
   */
  listingStartDate?: string;

  /**
   * Lot size for lot listings (identical or mixed lots).
   * Optional; applicable to both auction and fixed-price lots.
   */
  lotSize?: number;

  /**
   * Per-buyer purchase limit for this offer.
   * Optional; blocks purchases exceeding this cumulative quantity.
   */
  quantityLimitPerBuyer?: number;

  /**
   * Set true to create a private listing (hide buyer details).
   * Optional.
   */
  hideBuyerDetails?: boolean;

  /**
   * Up to two eBay Store category paths (e.g., "/Fashion/Men/Shirts").
   * Optional.
   */
  storeCategoryNames?: string[];

  /**
   * Sales-tax/VAT and tax exception settings.
   * Optional; see docs for constraints by marketplace.
   */
  tax?: Tax;

  /**
   * Charitable donation information (organization and %).
   * Optional; both fields required if used.
   */
  charity?: Charity;

  /**
   * Eco-participation fee (and deprecated FR EPR fields).
   * Optional.
   */
  extendedProducerResponsibility?: ExtendedProducerResponsibility;

  /**
   * Regulatory information (documents, hazmat, EEK, GPSR fields, etc.).
   * Optional; some fields conditionally required by marketplace/category.
   */
  regulatory?: Regulatory;
};

/**
 * This type defines an inventory item group, which is a collection of inventory items that are variations of a single product.
 * For example, a t-shirt available in different sizes and colors would be an inventory item group.
 */
export type InventoryItemGroup = {
  /**
   * Item specifics (product aspects) shared by all variations in the group.
   * Required before publishing the first offer.
   */
  aspects?: Record<string, string[]>;
  /**
   * Description of the inventory item group, used as the listing description.
   * Max Length: 500000 (including HTML).
   */
  description?: string;
  /**
   * URLs of images for the inventory item group. HTTPS protocol required.
   * At least one image is required before publishing an offer.
   */
  imageUrls?: string[];
  /**
   * Unique identifier for the inventory item group, created by the seller.
   * Not used in `createOrReplaceInventoryItemGroup` request body.
   */
  inventoryItemGroupKey?: string;
  /**
   * Optional listing subtitle. Max Length: 55.
   */
  subtitle?: string;
  /**
   * Title of the inventory item group, used as the listing title.
   * Required before publishing the first offer. Max Length: 80.
   */
  title?: string;
  /**
   * SKUs of individual inventory items belonging to this group.
   * Always returned.
   */
  variantSKUs: string[];
  /**
   * Defines product aspects that vary among items in the group (e.g., size, color).
   * Required before publishing the first offer.
   */
  variesBy?: {
    /**
     * Specifies the product aspect that determines image variations (e.g., 'Color').
     * Required before publishing the first offer if images vary.
     */
    aspectsImageVariesBy?: [string];
    /**
     * Lists product aspects that vary and their possible values (e.g., 'Color': ['Red', 'Blue']).
     * Required before publishing the first offer.
     */
    specifications?: Array<{
      /**
       * Name of the varying product aspect (e.g., 'Color', 'Size').
       */
      name?: string;
      /**
       * List of all possible values for the specified product aspect.
       */
      values?: string[];
    }>;
  };
  /**
   * IDs of eBay-hosted videos for the inventory item group. Only one video per listing is supported.
   */
  videoIds?: string[];
};

/** Union of all marketplace values (e.g., "EBAY_US") */
export type EbayMarketplace = (typeof EbayMarketplaceIdEnum)[keyof typeof EbayMarketplaceIdEnum];

/** Inventory item definition aligned with eBay Sell Inventory API */
export type InventoryItemWithSkuLocale = {
  /** Seller-defined SKU (Stock Keeping Unit); unique per item */
  sku: string;
  /** Sale availability across pickup and ship-to locations */
  availability: AvailabilityTypeEnum;
  /** Publish offer note: This field is required before an offer can be published to create an active listing. */
  condition: ConditionEnum;
  /** Free-text condition details (defects, cosmetic notes, etc.) */
  conditionDescription?: string;
  /** Structured condition attributes (name/value), e.g., “Battery Health: 90%” */
  conditionDescriptors?: ConditionDescriptor[];
  /** Listing locale controlling language/formatting */
  locale: LocaleEnum;
  /** Physical shipping dimensions and weight */
  packageWeightAndSize?: PackageWeightAndSize;
  /** Publish offer note: This container and a few of its child fields (as noted below) are required before an offer can be published to create an active listing. */
  product: Product;
};

/** Additional structured condition metadata */
export type ConditionDescriptor = {
  /** Optional extra detail for the descriptor */
  additionalInfo?: string;
  /** Descriptor name, e.g., "Battery Health" */
  name: string;
  /** Descriptor values, e.g., ["90%"] */
  values: string[];
};

/** Time duration value for fulfillment SLAs */
export type TimeDuration = {
  /** Unit of the duration (e.g., DAY, HOUR) */
  unit: TimeDurationUnitEnum;
  /** Numeric value of the duration */
  value: number;
};

export type CompatibleProduct = {
  /**
   * Array of motor vehicles compatible with the inventory item, defined by name/value pairs.
   */
  compatibilityProperties?: NameValueList[];
  /**
   * Seller-provided notes about the compatible vehicle list.
   * Max Length: 500
   */
  notes?: string;
  productFamilyProperties?: ProductFamilyProperties; // Deprecated
  /**
   * Identifies a compatible motor vehicle using an eBay Product ID (ePID) or K-Type value.
   */
  productIdentifier?: ProductIdentifier;
};

/**
 * Type that uses NameValueList
 */ export type NameValueList = {
  name: string;
  /**
   * Value of the motor vehicle aspect (e.g., 'Toyota' for 'make').
   */
  value: string;
};

/**
 * Type that uses ProductFamilyProperties
 */ export type ProductFamilyProperties = {
  engine?: string;
  make?: string;
  model?: string;
  trim?: string;
  year?: string;
};

/**
 * Identifies a compatible motor vehicle by eBay Product ID (ePID) or K-Type.
 * GTIN is for future use.
 * Note: Currently, parts compatibility is only for motor vehicles.
 */
export type ProductIdentifier = {
  /** The eBay catalog product ID (ePID) of the compatible motor vehicle.
   */
  epid?: string;
  /**
   * The Global Trade Item Number (GTIN) for the compatible motor vehicle.
   * Note: This field is for future use.
   */ gtin?: string;
  /**
   * The K-Type Number for the compatible motor vehicle.
   * Supported marketplaces: AU, DE, ES, FR, IT, UK.
   */
  ktype?: string;
};

/**
 * This type defines the compatible vehicle list for an inventory item.
 */ export type Compatibility = {
  compatibleProducts: CompatibleProduct[];
  /**
   * The seller - defined SKU value of the inventory item that will be associated with the compatible vehicles.
   * Note: This field is not applicable to the createOrReplaceProductCompatibility method, as the SKU value for the inventory item is passed in as part of the call URI and not in the request payload.It is always returned with the getProductCompatibility method.
   */
  sku: string;
};

/** Core product attributes for an inventory item */
export type Product = {
  /** Effective from December 28th, 2024, sellers offering certain rechargeable devices in EU and Northern Ireland markets must comply with the Common Charger Directive (CCD) and list appropriate charger-related aspects and values on their listings. See Common Charger Directive for more information.
   * Item specifics (product aspects). Required before publishing an offer.
   */
  aspects?: Record<string, string[]>;
  /** Brand/manufacturer name */
  brand?: string;
  /** Product description. Required before publishing an offer. */
  description?: string;
  /** European Article Number(s) (aka International Article Number) */
  ean?: string[];
  /** eBay Product ID linking to catalog record */
  epid?: string;
  /** URLs of product images. At least one image URL is required before publishing an offer. */
  imageUrls?: string[];
  /** ISBN(s) for books/media */
  isbn?: string[];
  /** Manufacturer Part Number */
  mpn?: string;
  /** Optional subtitle line for listing */
  subtitle?: string;
  /** Product title. Required before publishing an offer. */
  title: string;
  /** Universal Product Code(s) */
  upc?: string[];
  videoIds?: string[]; // eBay-hosted video IDs associated to the product
};

/**
 * InventoryItem
 * Detailed information about an inventory item.
 */
export type InventoryItem = {
  /**
   * Quantity availability data for the SKU.
   * Optional until publishing; required if availability already exists on update.
   */
  availability?: AvailabilityTypeEnum;

  /**
   * Item condition (varies by site/category). Required before publishing in most categories.
   */
  condition?: ConditionEnum;

  /**
   * Free-text clarification for used/non-new conditions (ignored for new conditions).
   * Max length: 1000.
   */
  conditionDescription?: string;

  /**
   * Structured condition descriptors (name/value attributes).
   */
  conditionDescriptors?: ConditionDescriptor[];

  /**
   * Package dimensions/weight. Required if calculated shipping or weight surcharge used; required on update if previously set.
   */
  packageWeightAndSize?: PackageWeightAndSize;

  /**
   * Product details (title, description, identifiers, aspects, images).
   * Required before publishing; returned for published offers.
   */
  product?: Product;
};

export type InventoryItemWithSkuLocaleGroupKeys = {
  availability: AvailabilityTypeEnum;
  condition: ConditionEnum;
  locale: LocaleEnum;
  packageWeightAndSize: PackageWeightAndSize;
  product: Product;
  sku: string;
};

/**
 * ShipToLocationAvailability
 * Total 'ship-to-home' availability and per-location warehouse availability distributions.
 */
export type ShipToLocationAvailability = {
  /**
   * Warehouse-level distribution of available quantity.
   */
  availabilityDistributions?: AvailabilityDistribution[];

  /**
   * Total 'ship-to-home' quantity across all marketplaces.
   * Must be included on update if already set, or data will be lost.
   */
  quantity?: number;
};

/**
 * AvailabilityDistribution
 * Quantity and optional fulfillment time at a specific merchant location.
 */
export type AvailabilityDistribution = {
  /**
   * Estimated fulfillment time from this location.
   */
  fulfillmentTime?: TimeDuration;

  /**
   * Merchant location key where inventory is available.
   * Required if quantity is set for this location.
   */
  merchantLocationKey?: string;

  /**
   * Quantity available at this location.
   * Required if merchantLocationKey is provided.
   */
  quantity?: number;
};

/**
 * ErrorDetailV3
 * Expresses detailed information on errors and warnings.
 */
export type ErrorDetailV3 = {
  /** Error category: REQUEST, APPLICATION, or SYSTEM */
  category?: string;
  /** Domain in which the error occurred */
  domain?: string;
  /** Unique error code */
  errorId: number;
  /** Reference IDs tied to request elements */
  inputRefIds?: string[];
  /** Detailed explanation of the error */
  longMessage?: string;
  /** Short error message */
  message: string;
  /** Reference IDs tied to response elements */
  outputRefIds?: string[];
  /** Parameters associated with the error */
  parameters?: ErrorParameterV3[];
  /** Subdomain in which the error occurred */
  subdomain?: string;
};

/**
 * ErrorParameterV3
 * Parameter field/value that triggered the error or warning.
 */
export type ErrorParameterV3 = {
  name: string;
  value: string;
};

/**
 * This enumerated type lists the two-letter ISO 3166-1 country code representing supported countries.
 *
 * Types that use CountryCode:
 * - Address
 * - CountryPolicy
 * - Manufacturer
 * - ResponsiblePerson
 *
 * Calls that use CountryCode:
 * - /bulk_create_offer
 * - /offer
 * - /offer/{offerId}
 * - /offer
 * - /offer/{offerId}
 * - /location/{merchantLocationKey}
 * - /location/{merchantLocationKey}
 * - /location
 * - /location/{merchantLocationKey}/update_location_details
 */
export enum CountryCodeEnum {
  AD = "AD", // Andorra
  AE = "AE", // United Arab Emirates
  AF = "AF", // Afghanistan
  AG = "AG", // Antigua and Barbuda
  AI = "AI", // Anguilla
  AL = "AL", // Albania
  AM = "AM", // Armenia
  AN = "AN", // Netherlands Antilles
  AO = "AO", // Angola
  AQ = "AQ", // Antarctica
  AR = "AR", // Argentina
  AS = "AS", // American Samoa
  AT = "AT", // Austria
  AU = "AU", // Australia
  AW = "AW", // Aruba
  AX = "AX", // Aland Islands
  AZ = "AZ", // Azerbaijan
  BA = "BA", // Bosnia and Herzegovina
  BB = "BB", // Barbados
  BD = "BD", // Bangladesh
  BE = "BE", // Belgium
  BF = "BF", // Burkina Faso
  BG = "BG", // Bulgaria
  BH = "BH", // Bahrain
  BI = "BI", // Burundi
  BJ = "BJ", // Benin
  BL = "BL", // Saint Barthelemy
  BM = "BM", // Bermuda
  BN = "BN", // Brunei Darussalam
  BO = "BO", // Bolivia
  BQ = "BQ", // Bonaire, Sint Eustatius, and Saba
  BR = "BR", // Brazil
  BS = "BS", // Bahamas
  BT = "BT", // Bhutan
  BV = "BV", // Bouvet Island
  BW = "BW", // Botswana
  BY = "BY", // Belarus
  BZ = "BZ", // Belize
  CA = "CA", // Canada
  CC = "CC", // Cocos (Keeling) Islands
  CD = "CD", // The Democratic Republic of the Congo
  CF = "CF", // Central African Republic
  CG = "CG", // Congo
  CH = "CH", // Switzerland
  CI = "CI", // Cote d'Ivoire
  CK = "CK", // Cook Islands
  CL = "CL", // Chile
  CM = "CM", // Cameroon
  CN = "CN", // China
  CO = "CO", // Colombia
  CR = "CR", // Costa Rica
  CU = "CU", // Cuba
  CV = "CV", // Cape Verde
  CW = "CW", // Curacao
  CX = "CX", // Christmas Island
  CY = "CY", // Cyprus
  CZ = "CZ", // Czech Republic
  DE = "DE", // Germany
  DJ = "DJ", // Djibouti
  DK = "DK", // Denmark
  DM = "DM", // Dominica
  DO = "DO", // Dominican Republic
  DZ = "DZ", // Algeria
  EC = "EC", // Ecuador
  EE = "EE", // Estonia
  EG = "EG", // Egypt
  EH = "EH", // Western Sahara
  ER = "ER", // Eritrea
  ES = "ES", // Spain
  ET = "ET", // Ethiopia
  FI = "FI", // Finland
  FJ = "FJ", // Fiji
  FK = "FK", // Falkland Islands (Malvinas)
  FM = "FM", // Federated States of Micronesia
  FO = "FO", // Faroe Islands
  FR = "FR", // France
  GA = "GA", // Gabon
  GB = "GB", // United Kingdom
  GD = "GD", // Grenada
  GE = "GE", // Georgia
  GF = "GF", // French Guiana
  GG = "GG", // Guernsey
  GH = "GH", // Ghana
  GI = "GI", // Gibraltar
  GL = "GL", // Greenland
  GM = "GM", // Gambia
  GN = "GN", // Guinea
  GP = "GP", // Guadeloupe
  GQ = "GQ", // Equatorial Guinea
  GR = "GR", // Greece
  GS = "GS", // South Georgia and the South Sandwich Islands
  GT = "GT", // Guatemala
  GU = "GU", // Guam
  GW = "GW", // Guinea-Bissau
  GY = "GY", // Guyana
  HK = "HK", // Hong Kong
  HM = "HM", // Heard Island and McDonald Islands
  HN = "HN", // Honduras
  HR = "HR", // Croatia
  HT = "HT", // Haiti
  HU = "HU", // Hungary
  ID = "ID", // Indonesia
  IE = "IE", // Ireland
  IL = "IL", // Israel
  IM = "IM", // Isle of Man
  IN = "IN", // India
  IO = "IO", // British Indian Ocean Territory
  IQ = "IQ", // Iraq
  IR = "IR", // Islamic Republic of Iran
  IS = "IS", // Iceland
  IT = "IT", // Italy
  JE = "JE", // Jersey
  JM = "JM", // Jamaica
  JO = "JO", // Jordan
  JP = "JP", // Japan
  KE = "KE", // Kenya
  KG = "KG", // Kyrgyzstan
  KH = "KH", // Cambodia
  KI = "KI", // Kiribati
  KM = "KM", // Comoros
  KN = "KN", // Saint Kitts and Nevis
  KP = "KP", // Democratic People's Republic of Korea
  KR = "KR", // Republic of Korea
  KW = "KW", // Kuwait
  KY = "KY", // Cayman Islands
  KZ = "KZ", // Kazakhstan
  LA = "LA", // Lao People's Democratic Republic
  LB = "LB", // Lebanon
  LC = "LC", // Saint Lucia
  LI = "LI", // Liechtenstein
  LK = "LK", // Sri Lanka
  LR = "LR", // Liberia
  LS = "LS", // Lesotho
  LT = "LT", // Lithuania
  LU = "LU", // Luxembourg
  LV = "LV", // Latvia
  LY = "LY", // Libyan Arab Jamahiriya
  MA = "MA", // Morocco
  MC = "MC", // Monaco
  MD = "MD", // Republic of Moldova
  ME = "ME", // Montenegro
  MF = "MF", // Saint Martin (French part)
  MG = "MG", // Madagascar
  MH = "MH", // Marshall Islands
  MK = "MK", // The Former Yugoslav Republic of Macedonia
  ML = "ML", // Mali
  MM = "MM", // Myanmar
  MN = "MN", // Mongolia
  MO = "MO", // Macao
  MP = "MP", // Northern Mariana Islands
  MQ = "MQ", // Martinique
  MR = "MR", // Mauritania
  MS = "MS", // Montserrat
  MT = "MT", // Malta
  MU = "MU", // Mauritius
  MV = "MV", // Maldives
  MW = "MW", // Malawi
  MX = "MX", // Mexico
  MY = "MY", // Malaysia
  MZ = "MZ", // Mozambique
  NA = "NA", // Namibia
  NC = "NC", // New Caledonia
  NE = "NE", // Niger
  NF = "NF", // Norfolk Island
  NG = "NG", // Nigeria
  NI = "NI", // Nicaragua
  NL = "NL", // Netherlands
  NO = "NO", // Norway
  NP = "NP", // Nepal
  NR = "NR", // Nauru
  NU = "NU", // Niue
  NZ = "NZ", // New Zealand
  OM = "OM", // Oman
  PA = "PA", // Panama
  PE = "PE", // Peru
  PF = "PF", // French Polynesia. Includes Tahiti.
  PG = "PG", // Papua New Guinea
  PH = "PH", // Philippines
  PK = "PK", // Pakistan
  PL = "PL", // Poland
  PM = "PM", // Saint Pierre and Miquelon
  PN = "PN", // Pitcairn
  PR = "PR", // Puerto Rico
  PS = "PS", // Palestinian territory Occupied
  PT = "PT", // Portugal
  PW = "PW", // Palau
  PY = "PY", // Paraguay
  QA = "QA", // Qatar
  RE = "RE", // Reunion
  RO = "RO", // Romania
  RS = "RS", // Serbia
  RU = "RU", // Russian Federation
  RW = "RW", // Rwanda
  SA = "SA", // Saudi Arabia
  SB = "SB", // Solomon Islands
  SC = "SC", // Seychelles
  SD = "SD", // Sudan
  SE = "SE", // Sweden
  SG = "SG", // Singapore
  SH = "SH", // Saint Helena
  SI = "SI", // Slovenia
  SJ = "SJ", // Svalbard and Jan Mayen
  SK = "SK", // Slovakia
  SL = "SL", // Sierra Leone
  SM = "SM", // San Marino
  SN = "SN", // Senegal
  SO = "SO", // Somalia
  SR = "SR", // Suriname
  ST = "ST", // Sao Tome and Principe
  SV = "SV", // El Salvador
  SX = "SX", // Sint Maarten (Dutch part)
  SY = "SY", // Syrian Arab Republic
  SZ = "SZ", // Swaziland
  TC = "TC", // Turks and Caicos Islands
  TD = "TD", // Chad
  TF = "TF", // French Southern Territories
  TG = "TG", // Togo
  TH = "TH", // Thailand
  TJ = "TJ", // Tajikistan
  TK = "TK", // Tokelau
  TL = "TL", // Timor-Leste
  TM = "TM", // Turkmenistan
  TN = "TN", // Tunisia
  TO = "TO", // Tonga
  TR = "TR", // Turkey
  TT = "TT", // Trinidad and Tobago
  TV = "TV", // Tuvalu
  TW = "TW", // Taiwan
  TZ = "TZ", // Tanzania
  UA = "UA", // Ukraine
  UG = "UG", // Uganda
  UM = "UM", // United States Minor Outlying Islands
  US = "US", // United States
  UY = "UY", // Uruguay
  UZ = "UZ", // Uzbekistan
  VA = "VA", // Holy See (Vatican City state)
  VC = "VC", // Saint Vincent and the Grenadines
  VE = "VE", // Venezuela
  VG = "VG", // British Virgin Islands
  VI = "VI", // the U.S. Virgin Islands
  VN = "VN", // Vietnam
  VU = "VU", // Vanuatu
  WF = "WF", // Wallis and Futuna
  WS = "WS", // Samoa
  YE = "YE", // Yemen
  YT = "YT", // Mayotte
  ZA = "ZA", // South Africa
  ZM = "ZM", // Zambia
  ZW = "ZW", // Zimbabwe
}

export type FormatTypeEnum = "AUCTION" | "FIXED_PRICE";

export type ListingDurationEnum = "GTC" | "DAYS_1" | "DAYS_3" | "DAYS_5" | "DAYS_7" | "DAYS_10" | "DAYS_21" | "DAY_30";

export type ShippingServiceTypeEnum = "DOMESTIC" | "INTERNATIONAL";

export type MinimumAdvertisedPriceHandlingEnum = "NONE" | "PRE_CHECKOUT" | "DURING_CHECKOUT";

export type SoldOnEnum = "ON_EBAY" | "OFF_EBAY" | "ON_AND_OFF_EBAY";
