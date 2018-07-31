import {createHelpers} from "./index"

interface State {
  value: number
  boolValue: boolean
}

interface Actions {
  addValue: number
  setBoolValue: boolean
}

const initialState: State = {value: 1, boolValue: false}

const helpers = createHelpers<State, Actions>("Foo", initialState, {
  addValue: (state, payload) => {
    return {...state, value: state.value + payload}
  },
  setBoolValue: (state, payload) => {
    return {...state, boolValue: payload}
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

test("boolean payload action creator", () => {
  expect(helpers.actionCreators.setBoolValue(true)).toEqual({
    type: "[Foo] setBoolValue",
    payload: true,
  })
})
