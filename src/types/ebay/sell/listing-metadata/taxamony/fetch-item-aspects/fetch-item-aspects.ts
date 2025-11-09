import type { Category } from "../get-category-suggestions/types.js";

export enum AspectApplicableToEnum {
  ITEM = "ITEM",
  PRODUCT = "PRODUCT",
}

export enum AspectDataTypeEnum {
  DATE = "DATE",
  NUMBER = "NUMBER",
  STRING = "STRING",
}

export enum AspectModeEnum {
  FREE_TEXT = "FREE_TEXT",
  SELECTION_ONLY = "SELECTION_ONLY",
}

export enum AspectUsageEnum {
  RECOMMENDED = "RECOMMENDED",
  OPTIONAL = "OPTIONAL",
}

export enum ItemToAspectCardinalityEnum {
  MULTI = "MULTI",
  SINGLE = "SINGLE",
}

export enum AspectAdvancedDataTypeEnum {
  NUMERIC_RANGE = "NUMERIC_RANGE",
}

export type AspectConstraint = {
  aspectApplicableTo?: AspectApplicableToEnum[];
  aspectDataType: AspectDataTypeEnum;
  aspectEnabledForVariations: boolean;
  aspectFormat?: string;
  aspectMaxLength?: number;
  aspectMode: AspectModeEnum;
  aspectRequired: boolean;
  aspectUsage: AspectUsageEnum;
  expectedRequiredByDate?: string;
  itemToAspectCardinality: ItemToAspectCardinalityEnum;
  aspectAdvancedDataType?: AspectAdvancedDataTypeEnum;
};

export type ValueConstraint = {
  applicableForLocalizedAspectName?: string;
  applicableForLocalizedAspectValues?: string[];
};

export type AspectValue = {
  localizedValue: string;
  valueConstraints?: ValueConstraint[];
};

export type RelevanceIndicator = {
  searchCount?: number;
};

export type Aspect = {
  aspectConstraint: AspectConstraint;
  aspectValues?: AspectValue[];
  localizedAspectName: string;
  relevanceIndicator?: RelevanceIndicator;
};

export type CategoryAspect = {
  category: Category;
  aspects?: Aspect[];
};

export type FetchItemAspectsResponse = {
  categoryTreeId: string;
  categoryTreeVersion: string;
  categoryAspects: CategoryAspect[];
};

export type FetchItemAspectsRequest = {
  category_tree_id: string;
};
