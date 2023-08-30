import { createAction, props } from '@ngrx/store';
import { Page } from 'src/app/models/page.model';
export const loadPages = createAction(
  '[Page PAGE] Load Pages',
  props<{ id: number }>()
);
export const loadPagesSuccess = createAction(
  '[Page API] Load Pages Success',
  props<{ value: Page[] }>()
);
export const loadPagesFailure = createAction(
  '[Page API] Load Page Failure',
  props<{ errorMsg: string }>()
);
