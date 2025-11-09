export type Category = {
  categoryId: string;
  categoryName: string;
};

export type AncestorReference = {
  categoryId: string;
  categoryName: string;
  categorySubtreeNodeHref: string;
  categoryTreeNodeLevel: number;
};

export type CategorySuggestion = {
  category: Category;
  categoryTreeNodeAncestors: AncestorReference[];
  categoryTreeNodeLevel: number;
  relevancy: string;
};

export type GetCategorySuggestionsResponse = {
  categorySuggestions: CategorySuggestion[];
  categoryTreeId: string;
  categoryTreeVersion: string;
};
