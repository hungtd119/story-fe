import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const userFeature = (state: any) => state.user;
export const selectIsAuth = createSelector(
  userFeature,
  (state: UserState) => state.isAuthenticate
);
export const selectIsLoading = createSelector(
  userFeature,
  (state: UserState) => state.isLoading
);
