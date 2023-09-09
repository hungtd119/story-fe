import { createSelector } from '@ngrx/store';
import { StoryState } from './story.reducer';
export const storyFeature = (state: any) => state.story;
export const selectStories = createSelector(
  storyFeature,
  (state: StoryState) => state.stories.stories
);
export const selectStoriesCount = createSelector(
  storyFeature,
  (state: StoryState) => state.stories.count
);
export const selectStory = createSelector(
  storyFeature,
  (state: StoryState) => state.story.story
);
export const selectPageStory = createSelector(
  storyFeature,
  (state: StoryState) => state.story.pages
);
