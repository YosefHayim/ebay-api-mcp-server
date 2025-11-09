export type CompatibilityProperty = {
  localizedName: string;
  name: string;
};

export type GetCompatibilityPropertiesResponse = {
  compatibilityProperties: CompatibilityProperty[];
};

export type GetCompatibilityPropertiesRequest = {
  category_tree_id: string;
  category_id: string;
};
