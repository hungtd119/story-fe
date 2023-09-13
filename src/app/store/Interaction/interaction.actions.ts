import { createAction, props } from '@ngrx/store';
export const loadInteractionByPageId = createAction(
  '[Interaction PAGE] Load interactions by page',
  props<{ id: number }>()
);
export const loadInteractionsSuccess = createAction(
  '[Interaction API] Load Interactions Success',
  props<{ value: any }>()
);
export const loadInteractionsFailure = createAction(
  '[Interaction API] Load Interactions Failure',
  props<{ errorMsg: string }>()
);
