import type { Amount, EbayMarketplaceIdEnum } from "../../../../global/globalEbayTypes.js";
import type {
  CountryCodeEnum,
  EbayOfferDetailsWithKeys,
  ErrorDetailV3,
  FormatTypeEnum,
  MinimumAdvertisedPriceHandlingEnum,
  ShippingServiceTypeEnum,
  SoldOnEnum,
} from "../inventory-api-global-types.js";

/**
 * Bulk request body for /bulk_create_offer.
 * Up to 25 offers per call.
 */
export type BulkCreateOfferRequest = {
  /**
   * The offers to create. Up to 25.
   * Optional for the type, but the API expects at least one element.
   */
  requests: EbayOfferDetailsWithKeys[];
};

/**
 * Pricing configuration for the offer.
 */
export type PricingSummary = {
  /**
   * Listing price (currency + value).
   * Required before publish.
   */
  price?: Amount;

  /**
   * Minimum Advertised Price (MAP).
   * US-eligible sellers only; ignored if not eligible.
   */
  minimumAdvertisedPrice?: Amount;

  /**
   * MAP visibility handling: PRE_CHECKOUT or DURING_CHECKOUT
   * (ignored if MAP not applicable).
   */
  pricingVisibility?: MinimumAdvertisedPriceHandlingEnum;

  /**
   * Original retail price used for Strikethrough Pricing (STP).
   * Must be higher than `price`. STP limited to specific sites.
   */
  originalRetailPrice?: Amount;

  /**
   * Where the original retail price was charged (ON_EBAY/OFF_EBAY/ON_AND_OFF_EBAY).
   * Required only when using STP.
   */
  originallySoldForRetailPriceOn?: SoldOnEnum;

  /**
   * Auction minimum bid price. For auction offers only.
   * Must be less than `auctionReservePrice` if that is used.
   */
  auctionStartPrice?: Amount;

  /**
   * Auction reserve price (fee applies: $5 or 7.5% of reserve, whichever higher).
   * Auction only.
   */
  auctionReservePrice?: Amount;
};

/**
 * Policy set used by the offer.
 * Payment/Return/Fulfillment policies are required before publish.
 */
export type ListingPolicies = {
  /**
   * Payment business policy ID.
   * Required before publish.
   */
  paymentPolicyId?: string;

  /**
   * Return business policy ID.
   * Required before publish.
   */
  returnPolicyId?: string;

  /**
   * Fulfillment/shipping business policy ID.
   * Required before publish.
   */
  fulfillmentPolicyId?: string;

  /**
   * eBay Plus eligibility for DE/AU (Top Rated Sellers).
   * Optional.
   */
  eBayPlusIfEligible?: boolean;

  /**
   * Per-service shipping cost overrides mapped by priority/order.
   * Optional; priority must match sortOrderId in fulfillment policy.
   */
  shippingCostOverrides?: ShippingCostOverride[];

  /**
   * Global product compliance policies (max 6).
   * Optional.
   */
  productCompliancePolicyIds?: string[];

  /**
   * Country-specific product compliance policies (GB/DE/FR/IT/ES; up to 6 per country).
   * Optional.
   */
  regionalProductCompliancePolicies?: RegionalProductCompliancePolicies;

  /**
   * Global take-back policy ID (max 1).
   * Optional; use regionalTakeBackPolicies for country-specific.
   */
  takeBackPolicyId?: string;

  /**
   * Country-specific take-back policies (GB/DE/FR/IT/ES; max 1 per country).
   * Optional.
   */
  regionalTakeBackPolicies?: RegionalTakeBackPolicies;

  /**
   * Best Offer settings (not supported for multi-variation listings).
   * Optional.
   */
  bestOfferTerms?: BestOffer;
};

/**
 * Override a shipping service cost from the fulfillment policy.
 */
export type ShippingCostOverride = {
  /**
   * DOMESTIC or INTERNATIONAL; must match the policy’s optionType.
   * Required when overriding.
   */
  shippingServiceType: ShippingServiceTypeEnum;

  /**
   * sortOrderId of the target shipping service in the fulfillment policy.
   * Required when overriding.
   */
  priority: number;

  /**
   * Cost to ship the first unit with this service.
   * Optional; supply again on update to retain value.
   */
  shippingCost?: Amount;

  /**
   * Cost to ship each additional identical item with this service.
   * Optional; supply again on update to retain value.
   */
  additionalShippingCost?: Amount;

  /**
   * Deprecated by eBay for policies; retained for wire compatibility.
   */
  surcharge?: Amount;
};

/**
 * Best Offer configuration (not available for multi-variation listings).
 */
export type BestOffer = {
  /**
   * Enable Best Offer on the listing.
   */
  bestOfferEnabled?: boolean;

  /**
   * Offers at or above this price auto-accept.
   * Must be < Buy It Now price.
   */
  autoAcceptPrice?: Amount;

  /**
   * Offers at or below this price auto-decline.
   * Must be < Buy It Now and < autoAcceptPrice (if used).
   */
  autoDeclinePrice?: Amount;
};

/**
 * Country-specific product compliance policies set.
 */
export type RegionalProductCompliancePolicies = {
  /**
   * Array of countries and their policy IDs.
   * Optional; up to 6 policies per country.
   */
  countryPolicies?: CountryPolicy[];
};

/**
 * Country-specific take-back policies set.
 */
export type RegionalTakeBackPolicies = {
  /**
   * Array of countries and their take-back policy IDs.
   * Optional; max 1 policy per supported country.
   */
  countryPolicies?: CountryPolicy[];
};

/**
 * Mapping of policy IDs to a country code.
 */
export type CountryPolicy = {
  /**
   * ISO 3166-1 alpha-2 country code.
   */
  country: CountryCodeEnum;

  /**
   * IDs of custom policies that apply to the country.
   */
  policyIds: string[];
};

/**
 * Sales tax / VAT configuration.
 */
export type Tax = {
  /**
   * Enable seller tax table (US territories/CA), or to use thirdPartyTaxCategory.
   * Note: US state tax is handled by eBay; tables apply to certain territories.
   */
  applyTax?: boolean;

  /**
   * Tax exception category (e.g., WASTE_RECYCLING_FEE).
   * If used, applyTax must be true.
   */
  thirdPartyTaxCategory?: string;

  /**
   * VAT rate percentage (business sellers only; VAT-enabled sites).
   * Max 6 chars incl. decimal; scale 3 (e.g., 12.345).
   */
  vatPercentage?: number;
};

/**
 * Charity configuration for donating a percentage of proceeds.
 */
export type Charity = {
  /**
   * eBay charity organization ID (via Charity API getCharityOrgs).
   * Required if charity is used.
   */
  charityId: string;

  /**
   * Donation percentage as a string in 5% increments from "10" to "100".
   * Required if charity is used.
   */
  donationPercentage: string;
};

/**
 * Extended Producer Responsibility fields.
 * ecoParticipationFee used in supported markets (e.g., FR).
 * Note: several per-listing FR EPR IDs deprecated per docs.
 */
export type ExtendedProducerResponsibility = {
  /**
   * Eco-participation fee (currency+value). Do not default to 0.
   */
  ecoParticipationFee?: Amount;

  /** DEPRECATED in docs; kept for wire compatibility. */
  producerProductId?: string;
  /** DEPRECATED in docs; kept for wire compatibility. */
  productDocumentationId?: string;
  /** DEPRECATED in docs; kept for wire compatibility. */
  productPackageId?: string;
  /** DEPRECATED in docs; kept for wire compatibility. */
  shipmentPackageId?: string;
};

/**
 * Regulatory information (GPSR/EU/UK/Energy/Hazmat/Product Safety).
 * Many fields are conditionally required by marketplace/category.
 */
export type Regulatory = {
  /**
   * Regulatory document references uploaded via Media API (createDocument).
   * Optional; to remove via updateOffer see docs.
   */
  documents?: DocumentRef[];

  /**
   * Energy Efficiency Label metadata (EU/UK Tyres/Appliances; Smartphones/Tablets on several sites).
   * Optional; may be auto-sourced if not supplied. Aspects for rating/range must be in inventory item.
   */
  energyEfficiencyLabel?: EnergyEfficiencyLabel;

  /**
   * Hazardous materials info. If provided, `statements` is required.
   * Use Metadata.getHazardousMaterialsLabels for valid codes.
   */
  hazmat?: Hazmat;

  /**
   * Product safety info. Requires at least one of `pictograms` or `statements`.
   * Use Metadata.getProductSafetyLabels for valid identifiers.
   */
  productSafety?: ProductSafety;

  /**
   * Manufacturer details (address/contact). GPSR-driven for EU/NI in some categories.
   */
  manufacturer?: Manufacturer;

  /**
   * Repair index score (0.0–10.0, one decimal; do not default to 0.0).
   * Applicable to specific categories (see EPR policies).
   */
  repairScore?: number;

  /**
   * EU-based Responsible Persons (max 5). GPSR requirement for certain cases.
   */
  responsiblePersons?: ResponsiblePerson[];
};

/**
 * Reference to a media document previously uploaded via Media API.
 */
export type DocumentRef = {
  /**
   * Media API documentId to attach to the listing for regulatory docs.
   */
  documentId: string;
};

/**
 * Energy Efficiency Label links/summary.
 */
export type EnergyEfficiencyLabel = {
  /**
   * Brief summary of the EEL (e.g., "On a scale A–G the rating is E").
   */
  imageDescription?: string;

  /**
   * URL of the Energy Efficiency Label image.
   */
  imageURL?: string;

  /**
   * URL of the Product Information Sheet.
   */
  productInformationSheet?: string;
};

/**
 * Hazardous materials section.
 * If included, `statements` is required.
 */
export type Hazmat = {
  /**
   * Component info (e.g., specific substance of concern). Optional.
   * Max length: 120.
   */
  component?: string;

  /**
   * Hazard pictogram codes. Optional.
   * Use Metadata.getHazardousMaterialsLabels for allowed values.
   */
  pictograms?: string[];

  /**
   * Signal word (e.g., "Danger" / "Warning"). Optional.
   * Use Metadata.getHazardousMaterialsLabels for allowed values.
   */
  signalWord?: string;

  /**
   * Required hazard statement codes if hazmat is provided.
   * Use Metadata.getHazardousMaterialsLabels for allowed values.
   */
  statements: string[];
};

/**
 * Product safety section.
 * Requires at least one of `pictograms` or `statements`.
 */
export type ProductSafety = {
  /**
   * Safety component information (e.g., "Tipping hazard").
   * Only valid when used with `pictograms` and/or `statements`.
   * Max length: 120.
   */
  component?: string;

  /**
   * Product safety pictogram identifiers (max 2).
   * Use Metadata.getProductSafetyLabels for allowed values.
   */
  pictograms?: string[];

  /**
   * Product safety statement identifiers (max 8).
   * Use Metadata.getProductSafetyLabels for allowed values.
   */
  statements?: string[];
};

/**
 * Manufacturer contact and address details (GPSR).
 */
export type Manufacturer = {
  /** Company name. Max 100. */
  companyName?: string;
  /** Address line 1. Max 180. */
  addressLine1?: string;
  /** Address line 2 (suite/apt). Max 180. */
  addressLine2?: string;
  /** City. Max 64. */
  city?: string;
  /** State/Province. Max 64. */
  stateOrProvince?: string;
  /** Postal code. Max 9. */
  postalCode?: string;
  /** Country (ISO 3166-1 alpha-2). */
  country?: CountryCodeEnum;
  /** Business email. Max 180. */
  email?: string;
  /** Business phone. Max 64. */
  phone?: string;
  /** Contact URL. Max 250. */
  contactUrl?: string;
};

/** Only supported value per docs. */
export type ResponsiblePersonType = "EU_RESPONSIBLE_PERSON";

/**
 * EU Responsible Person (GPSR) details. Max 5 entries.
 */
export type ResponsiblePerson = {
  /** Company/person name. Max 100. */
  companyName?: string;
  /** Address line 1. Max 180. */
  addressLine1?: string;
  /** Address line 2. Max 180. */
  addressLine2?: string;
  /** City. Max 64. */
  city?: string;
  /** State/Province. Max 64. */
  stateOrProvince?: string;
  /** Postal code. Max 9. */
  postalCode?: string;
  /** Country (ISO 3166-1 alpha-2). */
  country?: CountryCodeEnum;
  /** Email. Max 180. */
  email?: string;
  /** Phone. Max 64. */
  phone?: string;
  /** Contact URL. Max 250. */
  contactUrl?: string;
  /** Types; currently only "EU_RESPONSIBLE_PERSON". */ // TODO: Add enum for ResponsiblePersonType
  types?: ResponsiblePersonType[];
};

/**
 * Bulk response shape for /bulk_create_offer.
 */
export type BulkCreateOfferResponse = {
  /**
   * Per-offer creation results.
   * If created: statusCode=200 and offerId present.
   * If errors: see errors[] for details.
   */
  responses?: OfferSkuResponse[];
};

/**
 * Per-offer response.
 */
export type OfferSkuResponse = {
  /**
   * HTTP-like status code for this offer: 200=success, 207/400/500 otherwise.
   */
  statusCode: number;

  /**
   * Echoed SKU for which the offer was attempted.
   */
  sku: string;

  /**
   * Marketplace of the attempted offer.
   */
  marketplaceId: EbayMarketplaceIdEnum;

  /**
   * Echoed listing format.
   */
  format: FormatTypeEnum;

  /**
   * New offer ID if created successfully (statusCode 200).
   */
  offerId?: string;

  /**
   * Errors encountered for this offer (if any).
   */
  errors?: ErrorDetailV3[];

  /**
   * Warnings encountered for this offer (if any).
   */
  warnings?: ErrorDetailV3[];
};

/**
 * Parameter key/value returned with certain ErrorDetailV3 entries.
 * (Kept here in case you want to manipulate/inspect parameters explicitly.)
 */
export type ErrorParameterV3 = {
  /** Name of the offending input parameter. */
  name?: string;
  /** The actual value that triggered the error/warning. */
  value?: string;
};
