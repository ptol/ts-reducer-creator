import {createHelpers} from "./index"

interface State {
  value: number
  maybeValue: number | null
}

interface Actions {
  addValue: number
  setValue: number | null
}

const initialState: State = {value: 1, maybeValue: null}

const helpers = createHelpers<State, Actions>("Foo", initialState, {
  addValue: (state, payload) => {
    return {value: state.value + payload}
  },
  setValue: (state, payload) => {
    return {maybeValue: payload}
  },
})

test("reducer", () => {
  let newState = helpers.reducer(
    undefined,
    helpers.actionCreators.addValue(100),
  )
  expect(newState.value).toBe(101)

  newState = helpers.reducer(
    undefined,
    helpers.actionCreators.setValue(12),
  )
  expect(newState.maybeValue).toBe(12)

})

test("action type", () => {
  expect(helpers.actionTypes.addValue).toBe("[Foo] addValue"),
  expect(helpers.actionTypes.setValue).toBe("[Foo] setValue")
})

test("action creator", () => {
  expect(helpers.actionCreators.addValue(100)).toEqual({
    type: "[Foo] addValue",
    payload: 100,
  })
  expect(helpers.actionCreators.setValue(12)).toEqual({
    type: "[Foo] setValue",
    payload: 12,
  })
  expect(helpers.actionCreators.setValue(null)).toEqual({
    type: "[Foo] setValue",
    payload: null,
  })

})
