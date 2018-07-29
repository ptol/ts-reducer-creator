import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {createHelpers} from 'ts-reducer-creator';

export interface State {
  value: number;
}

export const initialState: State = {
  value: 0
};

interface CounterActions {
  useRemoteValue: number;
  increment: void;
  setValue: number;
}

export const helpers = createHelpers<State, CounterActions>('Counter', initialState, {
  increment: (state) => {
    return {...state, value: state.value + 1}; // state has type State
  },
  setValue: (state, payload) => {
    return {...state, value: payload};   // payload has type number
  },
  useRemoteValue: state => state
});
export const counterReducer = helpers.reducer;

function getRemoteValue() {
  return of(10);
}

@Injectable()
export class CounterEffects {
  @Effect()
  useRemoteValue$ = this.actions$.pipe(
    helpers.ofTypeFilters.useRemoteValue,
    mergeMap(action => getRemoteValue().pipe(map(x => helpers.actionCreators.setValue(x + action.payload))))
  );

  constructor(private actions$: Actions) { }
}


