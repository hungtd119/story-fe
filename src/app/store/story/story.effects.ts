import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { StoryService } from 'src/app/services/story.service';
import { loadPagesFailure, loadPagesSuccess } from '../page/page.actions';
import {
  loadStories,
  loadStoryFailure,
  loadStoriesSuccess,
  loadStory,
  loadStorySuccess,
  loadStoriesCard,
} from './story.actions';

export const getStories = createEffect(
  (actions$ = inject(Actions), storyService = inject(StoryService)) => {
    return actions$.pipe(
      ofType(loadStories),
      exhaustMap(() =>
        storyService.getStories().pipe(
          map((response) => {
            return loadStoriesSuccess({ value: response.data });
          }),
          catchError((error: { message: string }) =>
            of(loadStoryFailure({ errorMsg: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
export const getStory = createEffect(
  (actions$ = inject(Actions), storyService = inject(StoryService)) => {
    return actions$.pipe(
      ofType(loadStory),
      exhaustMap(({ id }) =>
        storyService.getStory(id).pipe(
          map((response) => {
            return loadStorySuccess({ value: response.data });
          }),
          catchError((error: { message: string }) =>
            of(loadStoryFailure({ errorMsg: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
export const getStoriesCard = createEffect(
  (actions$ = inject(Actions), storyService = inject(StoryService)) => {
    return actions$.pipe(
      ofType(loadStoriesCard),
      exhaustMap(({ limit, pageNumber }) =>
        storyService.getStoriesCard(limit, pageNumber).pipe(
          map((response) => {
            return loadStoriesSuccess({ value: response.data });
          }),
          catchError((error: { message: string }) =>
            of(loadStoryFailure({ errorMsg: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
export const displayErrorAlert = createEffect(
  () => {
    return inject(Actions).pipe(
      ofType(loadStoryFailure),
      tap(({ errorMsg }) => alert(errorMsg))
    );
  },
  { functional: true, dispatch: false }
);
