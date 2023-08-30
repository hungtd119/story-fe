import { createSelector } from '@ngrx/store';
import { PageState } from './page.reducers';
export const pageFeature = (state: any) => state.pages;
export const selectPages = createSelector(
  pageFeature,
  (state: PageState) => state.pages
);
