import type { MarketplaceIdEnum } from "../../../accountManagement/accountV1/fulfillment-policy/update-fulfuillment-policy-ts.js";

export type GetCategoryTreeRequest = {
  category_tree_id: string;
};

export type GetCategoryTreeResponse = {
  applicableMarketplaceIds: MarketplaceIdEnum[];
  categoryTreeId: string;
  categoryTreeVersion: string;
  rootCategoryNode: CategoryTreeNode;
};

export type CategoryTreeNode = {
  category: Category;
  categoryTreeNodeLevel: number;
  childCategoryTreeNodes?: CategoryTreeNode[];
  leafCategoryTreeNode?: boolean;
  parentCategoryTreeNodeHref?: string;
};

export type Category = {
  categoryId: string;
  categoryName: string;
};
