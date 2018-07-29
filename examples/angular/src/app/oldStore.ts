import {Injectable} from '@angular/core';
import {a} from '@angular/core/src/render3';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

export interface State {
  value: number;
}

export const initialState: State = {
  value: 0
};

export enum CounterActionTypes {
  INCREMENT = '[Counter] Increment',
  SET_VALUE = '[Counter] SetValue',
  USE_REMOTE_VALUE = '[Counter] UseRemoteValue',
}

export class Increment implements Action {
  readonly type = CounterActionTypes.INCREMENT;
}

export class UseRemoteValue implements Action {
  readonly type = CounterActionTypes.USE_REMOTE_VALUE;

  constructor(public payload: number) {
  }
}

export class SetValue implements Action {
  readonly type = CounterActionTypes.SET_VALUE;

  constructor(public payload: number) {
  }
}

export type CounterActionsUnion = Increment | SetValue | UseRemoteValue;

export function counterReducer(state = initialState, action: CounterActionsUnion): State {
  switch (action.type) {
    case CounterActionTypes.INCREMENT: {
      return {...state, value: state.value + 1};
    }

    case CounterActionTypes.SET_VALUE: {
      return {value: action.payload};
    }

    default: {
      return state;
    }
  }
}

function getRemoteValue() {
  return of(10);
}

@Injectable()
export class CounterEffects {
  @Effect()
  remoteValue$: Observable<Action> = this.actions$.pipe(
    ofType<UseRemoteValue>(CounterActionTypes.USE_REMOTE_VALUE),
    mergeMap(action => getRemoteValue().pipe(map(x => new SetValue(x + action.payload))))
  );

  constructor(private actions$: Actions) {
  }
}


