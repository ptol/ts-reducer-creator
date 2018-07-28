import {createHelpers} from "./index"

interface State {
  value: number
}

interface Actions {
  addValue: number
}

const initialState: State = {value: 1}

const helpers = createHelpers<State, Actions>("Foo", initialState, {
  addValue: (state, payload) => {
    return {value: state.value + payload}
  },
})

test("reducer", () => {
  const newState = helpers.reducer(
    undefined,
    helpers.actionCreators.addValue(100),
  )
  expect(newState.value).toBe(101)
})

test("action type", () => {
  expect(helpers.actionTypes.addValue).toBe("[Foo] addValue")
})

test("action creator", () => {
  expect(helpers.actionCreators.addValue(100)).toEqual({
    type: "[Foo] addValue",
    payload: 100,
  })
})
