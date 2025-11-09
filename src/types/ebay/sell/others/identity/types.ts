import type { EbayMarketplaceIdEnum } from "@/types/ebay/global/global-ebay-types";
import type { CountryCodeEnum } from "../../listingManagement/inventoryAPI/inventory-api-global-types.js";

/**
 * Indicates the user account type.
 */
export enum AccountTypeEnum {
  INDIVIDUAL = "INDIVIDUAL",
  BUSINESS = "BUSINESS",
}

/**
 * Indicates the user's account status.
 */
export enum UserStatusEnum {
  CONFIRMED = "CONFIRMED",
  UNCONFIRMED = "UNCONFIRMED",
  ACCOUNTONHOLD = "ACCOUNTONHOLD",
  UNDETERMINED = "UNDETERMINED",
}

/**
 * Phone number information.
 */
export type Phone = {
  countryCode: string;
  number: string;
  phoneType: string; // e.g., MOBILE, LAND_LINE
};

/**
 * Address information.
 */
export type Address = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: CountryCodeEnum; // e.g., "US"
  county?: string;
  postalCode: string;
  stateOrProvince?: string;
};

/**
 * Contact details.
 */
export type Contact = {
  firstName: string;
  lastName: string;
};

/**
 * Business account information.
 */
export type BusinessAccount = {
  address: Address;
  doingBusinessAs?: string;
  email: string;
  name: string;
  primaryContact: Contact;
  primaryPhone: Phone;
  secondaryPhone?: Phone;
  website?: string;
};

/**
 * Individual account information.
 */
export type IndividualAccount = {
  email: string;
  firstName: string;
  lastName: string;
  primaryPhone: Phone;
  registrationAddress: Address;
  secondaryPhone?: Phone;
};

/**
 * User profile returned by GET /user/.
 */
export type getUserResponse = {
  accountType: AccountTypeEnum;
  businessAccount?: BusinessAccount;
  individualAccount?: IndividualAccount;
  registrationMarketplaceId: EbayMarketplaceIdEnum; // e.g., "EBAY_US"
  status: UserStatusEnum;
  userId: string; // e.g., "i5sfhdj2qwe"
  username?: string; // made optional to align with possible omission
};

/**
 * Actual API payload shape you showed:
 * {
 *   "eBayUser": { ...getUserResponse }
 * }
 */
export type GetUserApiResponse = {
  eBayUser: getUserResponse;
};
