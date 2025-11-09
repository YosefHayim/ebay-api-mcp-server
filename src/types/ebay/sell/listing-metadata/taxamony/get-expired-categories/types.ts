export type ExpiredCategory = {
  fromCategoryId: string;
  toCategoryId: string;
};

export type GetExpiredCategoriesResponse = {
  expiredCategories: ExpiredCategory[];
};

export type GetExpiredCategoriesRequest = {
  category_tree_id: string;
};
