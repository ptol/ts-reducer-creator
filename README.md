# How to use

First you need to define your actions and their payload types
```typescript
interface CounterActions {
    setValue: number; \\"setValue" is an action and number is a payload type 
    increment: void;    
}

```
and State
```typescript
export interface State {
    value: number;
}

export const initialState: State = {
    value: 0
}
```

Then you can call `createHelpers`
```typescript
import {createHelpers} from 'ts-reducer-creator';

export const {reducer, actionCreators, ofTypeFilters, actionTypes} =
  createHelpers<State, CounterActions>('Counter', initialState, {
    increment: (state) => {
        return {...state, value: state.value + 1}; // state has type State
    },
    setValue: (state, payload) => {
        return {...state, value: payload};   // payload has type number
    },
});
```
to create

* **reducer** - your reducer function
* **actionCreators** - action creators `actionCreators.setValue(10)`
* **ofTypeFilters** - action filters for `Obserable<Action>`. It can be used with `redux-observable` or `ngrx effects` `actions$.pipe(ofTypeFilters.increment)`
* **actionTypes** - action types `actionTypes.increment`

# Boilerplate vs ts-reducer-creator 

## Boilerplate
```typescript
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
    constructor(public payload: number) {}
}

export class SetValue implements Action {
    readonly type = CounterActionTypes.SET_VALUE;
    constructor(public payload: number) {}
}

export type CounterActionsUnion = Increment | SetValue | UseRemoteValue;

export function reducer(state = initialState, action: CounterActionsUnion): State {
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


const actionCreators = {
  increment: () => new Increment(),
  setValue: (payload: number) => new setValue(payload),
}
```
## ts-reducer-creator
```typescript
interface CounterActions {
    increment: void;
    setValue: number;
}

export const {reducer} = createHelpers<State, CounterActions>('Counter', initialState, {
    increment: (state) => {
        return {...state, value: state.value + 1}; 
    },
    setValue: (state, payload) => {
        return {...state, value: payload};  
    }
});
```
# Examples
https://github.com/ptol/ts-reducer-creator/tree/master/examples

## Angular with ngrx
https://github.com/ptol/ts-reducer-creator/blob/master/examples/angular/src/app/newStore.ts

## React with redux and redux-observable
https://github.com/ptol/ts-reducer-creator/blob/master/examples/react/src/newStore.ts
