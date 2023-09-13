import { createSelector } from '@ngrx/store';
import { InteractionState } from './interaction.reducers';
export const interactionFeature = (state: any) => state.interactions;
export const selectInteractions = createSelector(
  interactionFeature,
  (state: InteractionState) => state.interactions.interactions
);
