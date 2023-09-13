import { createReducer, on } from '@ngrx/store';
import { Page } from 'src/app/models/page.model';
import {
  loadPageInteractions,
  loadPageSuccess,
  loadPageToConfigByStoryId,
  loadPagesIdSuccess,
  loadPagesSuccess,
  setPosition,
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
  on(loadPageInteractions, (state, payload) => ({
    ...state,
    page: {
      ...state.page,
      interactions: [...state.page.interactions, payload.value],
    },
  })),
  on(loadPagesIdSuccess, (state, payload) => ({
    ...state,
    pagesId: payload.value,
  })),
  on(setPosition, (state, payload) => ({
    ...state,
    page: {
      ...state.page,
      interactions: state.page.interactions.map((interaction: any) => {
        if (interaction.id !== payload.interactionId) return interaction;
        return {
          ...interaction,
          positions: [...interaction.positions, { ...payload.value }],
        };
      }),
    },
  }))
);
