import { createAction, props } from '@ngrx/store';
import { Page } from 'src/app/models/page.model';
export const loadPages = createAction(
  '[Page PAGE] Load Pages',
  props<{ id: string; limit: number; pageNumber: number }>()
);
export const loadPagesSuccess = createAction(
  '[Page API] Load Pages Success',
  props<{ value: any }>()
);
export const loadPagesFailure = createAction(
  '[Page API] Load Page Failure',
  props<{ errorMsg: string }>()
);

export const loadPage = createAction(
  '[Page PAGE] Load Page',
  props<{ id: number }>()
);
export const loadPageToConfigByStoryId = createAction(
  '[Page PAGE] Load Page to config',
  props<{ storyId: string; pageId: string }>()
);
export const loadPageSuccess = createAction(
  '[Page API] Load Page Success',
  props<{ value: Page }>()
);
