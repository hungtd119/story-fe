import { createReducer, on } from '@ngrx/store';
import { setIsAuthenticate } from './user.actions';

export interface UserState {
  isAuthenticate: boolean;
  user: any;
}
export const initialState: UserState = {
  isAuthenticate: true,
  user: {},
};
export const userReducer = createReducer(
  initialState,
  on(setIsAuthenticate, (state, payload) => ({
    ...state,
    isAuthenticate: payload.value,
  }))
);
