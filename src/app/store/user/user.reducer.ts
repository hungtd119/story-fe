import { createReducer, on } from '@ngrx/store';
import { setIsAuthenticate, setIsLoading, setUser } from './user.actions';

export interface UserState {
  isAuthenticate: boolean;
  isLoading: boolean;
  user: any;
}
export const initialState: UserState = {
  isAuthenticate: false,
  isLoading: true,
  user: {},
};
export const userReducer = createReducer(
  initialState,
  on(setIsAuthenticate, (state, payload) => ({
    ...state,
    isAuthenticate: payload.value,
  })),
  on(setUser, (state, payload) => ({
    ...state,
    user: payload.value,
  })),
  on(setIsLoading, (state, payload) => ({
    ...state,
    isLoading: payload.value,
  }))
);
