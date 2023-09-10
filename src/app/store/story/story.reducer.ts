import { createReducer, on } from '@ngrx/store';
import {
  loadStoriesSuccess,
  loadStorySuccess,
  postStorySuccess,
} from './story.actions';
import { Story } from 'src/app/models/story.model';
import { Page } from 'src/app/models/page.model';

export interface StoryState {
  stories: {
    stories: Story[];
    count: number;
  };
  story: {
    story: any;
    pages: Page[];
  };
}
export const initialState: StoryState = {
  stories: { stories: [], count: 0 },
  story: {
    story: {},
    pages: [],
  },
};
export const storyReducer = createReducer(
  initialState,
  on(loadStoriesSuccess, (state, payload) => ({
    ...state,
    stories: payload.value,
  })),
  on(loadStorySuccess, (state, payload) => ({
    ...state,
    story: payload.value,
  })),
  on(postStorySuccess, (state, payload) => ({
    ...state,
    stories: {
      ...state.stories,
      stories: [{ ...payload.value }, ...state.stories.stories],
    },
  }))
);
