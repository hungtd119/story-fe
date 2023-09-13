import { exhaustMap, switchMap, map, catchError, of, tap } from 'rxjs';
import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  loadInteractionByPageId,
  loadInteractionsFailure,
  loadInteractionsSuccess,
} from './interaction.actions';
import { InteractionService } from 'src/app/services/interaction.service';
export const getInteractions = createEffect(
  (
    actions$ = inject(Actions),
    interactionService = inject(InteractionService)
  ) => {
    return actions$.pipe(
      ofType(loadInteractionByPageId),
      exhaustMap(({ id }) =>
        interactionService.getInteractionsByPageId(id).pipe(
          map((response) => loadInteractionsSuccess({ value: response.data })),
          catchError((error: { message: string }) =>
            of(loadInteractionsFailure({ errorMsg: error.message }))
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
      ofType(loadInteractionsFailure),
      tap(({ errorMsg }) => alert(errorMsg))
    );
  },
  { functional: true, dispatch: false }
);
