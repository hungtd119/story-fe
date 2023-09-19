import { createAction, props } from '@ngrx/store';
export const setIsAuthenticate = createAction(
  '[User Page] Set isAuthenticate',
  props<{ value: boolean }>()
);
