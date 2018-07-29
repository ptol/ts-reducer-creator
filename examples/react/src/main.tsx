import {App} from "./app"
import {createEpicMiddleware} from "redux-observable"
import {counterReducer, State, useRemoteValueEpic} from "./newStore"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {applyMiddleware, createStore, Store} from "redux"

const epicMiddleware = createEpicMiddleware();
const store = createStore(counterReducer,  applyMiddleware(epicMiddleware)) as Store<State>
epicMiddleware.run(useRemoteValueEpic);
ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById("root")
)

