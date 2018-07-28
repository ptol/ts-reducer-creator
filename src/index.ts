import {OperatorFunction} from "rxjs"
import {filter} from "rxjs/operators"

export interface Action<TPayload> {
  type: string
  payload: TPayload
}

export type Reducer<S> = (state: S | undefined, action: Action<any>) => S

export type ActionHandler<TState, TPayload> = (
  state: TState,
  payload: TPayload,
) => TState | undefined

export type ActionHandlers<TActions, TState> = {
  [key in keyof TActions]: ActionHandler<TState, TActions[key]>
}

export type ActionCreator<TPayload> = TPayload extends void
  ? () => Action<TPayload>
  : (payload: TPayload) => Action<TPayload>

export type ActionCreators<TActions> = {
  [key in keyof TActions]: ActionCreator<TActions[key]>
}

export type ActionTypes<TActions> = {[key in keyof TActions]: string}

export type ActionOfTypes<TActions> = {
  [key in keyof TActions]: OperatorFunction<Action<any>, Action<TActions[key]>>
}

function actionCreator<TPayload>(type: string): ActionCreator<TPayload> {
  return ((payload: TPayload) => ({
    type,
    payload,
  })) as any
}

function keys<T>(o: T): [keyof T] {
  return Object.keys(o) as any
}

export function createHelpers<TState, TActions>(
  actionTypePrefix: string,
  initialState: TState,
  handlers: ActionHandlers<TActions, TState>,
): {
  reducer: Reducer<TState>
  actionCreators: ActionCreators<TActions>
  ofTypeFilters: ActionOfTypes<TActions>
  actionTypes: ActionTypes<TActions>
} {
  const actionCreators: Record<keyof TActions, any> = {} as any
  const ofTypeFilters: Record<keyof TActions, any> = {} as any
  const actionTypes: Record<keyof TActions, any> = {} as any
  const fullTypeHandlers: Record<string, any> = {}

  const fullPrefix = actionTypePrefix ? `[${actionTypePrefix}] ` : ""
  const createFullType = (key: keyof TActions) => fullPrefix + key

  keys(handlers).forEach(key => {
    const fullType = createFullType(key)
    actionCreators[key] = actionCreator(fullType)
    ofTypeFilters[key] = filter((x: Action<any>) => x.type === fullType)
    actionTypes[key] = fullType
    fullTypeHandlers[fullType] = handlers[key]
  })

  const reducer = (state: TState | undefined, action: Action<any>) => {
    const handler = fullTypeHandlers[action.type]
    return handler
      ? handler(state || initialState, action.payload)
      : state || initialState
  }

  return {reducer, actionCreators, ofTypeFilters, actionTypes}
}
