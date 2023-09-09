import { createSelector } from '@ngrx/store';
import { PageState } from './page.reducers';
export const pageFeature = (state: any) => state.pages;
export const selectPages = createSelector(
  pageFeature,
  (state: PageState) => state.pages.pages
);
export const selectPagesCount = createSelector(
  pageFeature,
  (state: PageState) => state.pages.count
);
export const selectPage = createSelector(
  pageFeature,
  (state: PageState) => state.page
);
