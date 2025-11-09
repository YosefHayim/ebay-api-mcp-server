import type { Aspect, FetchItemAspectsRequest } from "../fetch-item-aspects/fetch-item-aspects.js";

export type GetItemAspectsForCategoryRequest = FetchItemAspectsRequest & {
  category_id: string;
};

export type GetItemAspectsForCategoryResponse = {
  aspects: Aspect[];
};
