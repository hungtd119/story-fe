import { createAction, props } from '@ngrx/store';
import { Story } from 'src/app/models/story.model';

export const loadStories = createAction('[Stories Page] Load Story');
export const loadStoriesSuccess = createAction(
  '[Stories API] Load Story Success',
  props<{ value: Story[] }>()
);
export const loadStoryFailure = createAction(
  '[Stories API] Load Story Failure',
  props<{ errorMsg: string }>()
);

export const loadStory = createAction(
  '[Story Page] Load Story Detail',
  props<{ id: string }>()
);
export const loadStorySuccess = createAction(
  '[Story API] Load Story Detail Success',
  props<{ value: Story }>()
);
export const loadStoriesCard = createAction('[Stories Page] Load Stories Card');
