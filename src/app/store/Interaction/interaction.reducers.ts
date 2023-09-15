import { createReducer, on } from '@ngrx/store';
import { Interaction } from 'src/app/models/interaction.model';
import { loadInteractionsSuccess } from './interaction.actions';
import { Position } from 'src/app/models/position.model';

export interface InteractionState {
  interactions: {
    interactions: Interaction[];
    count: number;
  };
  positions: Position[];
}

export const initialState: InteractionState = {
  interactions: {
    interactions: [],
    count: 0,
  },
  positions: [],
};

export const interactionReducer = createReducer(
  initialState,
  on(loadInteractionsSuccess, (state, payload) => ({
    ...state,
    interactions: payload.value,
  }))
);
