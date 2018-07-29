import {helpers, State} from "./newStore"
import * as React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

export interface Props extends State {
  actions: typeof helpers.actionCreators
}

class AppComponent extends React.Component<Props> {

  render() {
    const { value, actions } = this.props
    return (
      <div>
        <p>Value: { value }</p>
        <button onClick={() => actions.increment()}>Increment</button>
        <button onClick={() => actions.useRemoteValue(1)}>Use remote value</button>
      </div>
    )
  }
}

export const App = connect(
  state => state,
  (dispatch) => ({ actions: bindActionCreators(helpers.actionCreators, dispatch) })
)(AppComponent) as any

