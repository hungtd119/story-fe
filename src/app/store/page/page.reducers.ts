import { createReducer, on } from '@ngrx/store';
import { Page } from 'src/app/models/page.model';
import {
  loadPageSuccess,
  loadPageToConfigByStoryId,
  loadPagesIdSuccess,
  loadPagesSuccess,
} from './page.actions';

export interface PageState {
  pages: {
    pages: Page[];
    count: number;
  };
  page: any;
  pagesId: [];
}

export const initialState: PageState = {
  pages: {
    pages: [],
    count: 0,
  },
  page: {},
  pagesId: [],
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
  })),
  on(loadPagesIdSuccess, (state, payload) => ({
    ...state,
    pagesId: payload.value,
  }))
);
