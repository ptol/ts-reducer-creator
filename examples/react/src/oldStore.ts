import {Observable, of} from 'rxjs'
import {map, mergeMap} from 'rxjs/operators'
import {Action} from "redux"
import {ofType} from "redux-observable"


export interface State {
    value: number;
}

export const initialState: State = {
    value: 0
}

export enum CounterActionTypes {
    INCREMENT = '[Counter] Increment',
    SET_VALUE = '[Counter] SetValue',
    USE_REMOTE_VALUE = '[Counter] UseRemoteValue',
}


export class Increment implements Action {
    readonly type = CounterActionTypes.INCREMENT
}

export class UseRemoteValue implements Action {
    readonly type = CounterActionTypes.USE_REMOTE_VALUE

    constructor(public payload: number) {
    }
}

export class SetValue implements Action {
    readonly type = CounterActionTypes.SET_VALUE

    constructor(public payload: number) {
    }
}

export type CounterActionsUnion = Increment | SetValue | UseRemoteValue;

const actionCreators = {
    increment: () => new Increment(),
    setValue: (payload: number) => new SetValue(payload),
    useRemoteValue: (payload: number) => new UseRemoteValue(payload)
}

export function counterReducer(state = initialState, action: CounterActionsUnion): State {
    switch (action.type) {
        case CounterActionTypes.INCREMENT: {
            return {...state, value: state.value + 1}
        }

        case CounterActionTypes.SET_VALUE: {
            return {value: action.payload}
        }

        default: {
            return state
        }
    }
}

function getRemoteValue() {
    return of(10)
}

export const useRemoteValueEpic = (action$: Observable<Action>) => action$.pipe(
    ofType<UseRemoteValue>(CounterActionTypes.USE_REMOTE_VALUE),
    mergeMap(action => getRemoteValue().pipe(map(x => new SetValue(x + action.payload))))
)

