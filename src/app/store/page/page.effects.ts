import { exhaustMap, switchMap, map, catchError, of, tap } from 'rxjs';
import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { PageService } from 'src/app/services/page.service';
import {
  loadPage,
  loadPagePlay,
  loadPageSuccess,
  loadPageToConfig,
  loadPageToConfigByStoryId,
  loadPages,
  loadPagesFailure,
  loadPagesId,
  loadPagesIdSuccess,
  loadPagesSuccess,
} from './page.actions';
export const getPages = createEffect(
  (actions$ = inject(Actions), pageService = inject(PageService)) => {
    return actions$.pipe(
      ofType(loadPages),
      exhaustMap(({ id, limit, pageNumber }) =>
        pageService.getPageByStoryId(id, limit, pageNumber).pipe(
          map((response) => loadPagesSuccess({ value: response.data })),
          catchError((error: { message: string }) =>
            of(loadPagesFailure({ errorMsg: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
export const getPage = createEffect(
  (actions$ = inject(Actions), pageService = inject(PageService)) => {
    return actions$.pipe(
      ofType(loadPage),
      exhaustMap(({ id }) =>
        pageService.getPageById(id).pipe(
          map((response) => loadPageSuccess({ value: response.data })),
          catchError((error: { message: string }) =>
            of(loadPagesFailure({ errorMsg: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const getPagesFullByStoryId = createEffect(
  (actions$ = inject(Actions), pageService = inject(PageService)) => {
    return actions$.pipe(
      ofType(loadPageToConfigByStoryId),
      exhaustMap(({ storyId, pageId }) =>
        pageService.getPagesFullByStoryId(storyId, pageId).pipe(
          map((response) => loadPageSuccess({ value: response.data })),
          catchError((error: { message: string }) =>
            of(loadPagesFailure({ errorMsg: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
export const getPagesIdByStoryId = createEffect(
  (actions$ = inject(Actions), pageService = inject(PageService)) => {
    return actions$.pipe(
      ofType(loadPagesId),
      exhaustMap(({ storyId }) =>
        pageService.getPagesIdByStoryId(storyId).pipe(
          map((response) => loadPagesIdSuccess({ value: response.data })),
          catchError((error: { message: string }) =>
            of(loadPagesFailure({ errorMsg: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
export const getPageToConfig = createEffect(
  (actions$ = inject(Actions), pageService = inject(PageService)) => {
    return actions$.pipe(
      ofType(loadPageToConfig),
      exhaustMap(({ id }) =>
        pageService.getPageToConfig(id).pipe(
          map((response) => loadPageSuccess({ value: response.data })),
          catchError((error: { message: string }) =>
            of(loadPagesFailure({ errorMsg: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
export const getPageToPlay = createEffect(
  (actions$ = inject(Actions), pageService = inject(PageService)) => {
    return actions$.pipe(
      ofType(loadPagePlay),
      exhaustMap(({ id }) =>
        pageService.getPageToPlay(id).pipe(
          map((response) => loadPageSuccess({ value: response.data })),
          catchError((error: { message: string }) =>
            of(loadPagesFailure({ errorMsg: error.message }))
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
      ofType(loadPagesFailure),
      tap(({ errorMsg }) => alert(errorMsg))
    );
  },
  { functional: true, dispatch: false }
);
