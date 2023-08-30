import { createReducer, on } from '@ngrx/store';
import { Page } from 'src/app/models/page.model';
import { loadPagesSuccess } from './page.actions';

export interface PageState {
  pages: Page[];
}

export const initialState: PageState = {
  pages: [],
};

export const pageReducer = createReducer(
  initialState,
  on(loadPagesSuccess, (state, payload) => ({
    ...state,
    pages: payload.value,
  }))
);
