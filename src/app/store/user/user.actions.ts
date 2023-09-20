import { createAction, props } from '@ngrx/store';
export const setIsAuthenticate = createAction(
  '[User Page] Set isAuthenticate',
  props<{ value: boolean }>()
);
export const setUser = createAction(
  '[User Page] Set user',
  props<{ value: any }>()
);
export const setIsLoading = createAction(
  '[User Page] Set Loading',
  props<{ value: boolean }>()
);
