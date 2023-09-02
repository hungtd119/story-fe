import { createReducer, on } from '@ngrx/store';
import { Page } from 'src/app/models/page.model';
import { loadPageSuccess, loadPagesSuccess } from './page.actions';

export interface PageState {
  pages: Page[];
  page: any;
}

export const initialState: PageState = {
  pages: [],
  page: {},
};

export const pageReducer = createReducer(
  initialState,
  on(loadPagesSuccess, (state, payload) => ({
    ...state,
    pages: payload.value,
  })),
  on(loadPageSuccess, (state, payload) => ({
    ...state,
    page: payload.value,
  }))
);
