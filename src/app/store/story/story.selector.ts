import { createSelector } from '@ngrx/store';
import { StoryState } from './story.reducer';
export const storyFeature = (state: any) => state.story;
export const selectStories = createSelector(
  storyFeature,
  (state: StoryState) => state.stories
);
export const selectStory = createSelector(
  storyFeature,
  (state: StoryState) => state.story
);
