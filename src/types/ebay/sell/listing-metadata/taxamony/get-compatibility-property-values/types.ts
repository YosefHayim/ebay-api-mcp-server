export type CompatibilityPropertyValue = {
  value: string;
};

export type GetCompatibilityPropertyValuesResponse = {
  compatibilityPropertyValues: CompatibilityPropertyValue[];
};

export type GetCompatibilityPropertyValuesRequest = {
  category_tree_id: string;
  compatibility_property: string;
  category_id: string;
  filter?: string;
};
