import { createReducer, on } from '@ngrx/store';
import { loadStoriesSuccess, loadStorySuccess } from './story.actions';
import { Story } from 'src/app/models/story.model';

export interface StoryState {
  stories: Story[];
  story: any;
}
export const initialState: StoryState = {
  stories: [],
  story: {},
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
  }))
);
