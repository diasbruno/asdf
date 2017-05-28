/*global require */

import "../css/main.css";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store, { Provider, DevTools, connect } from "./state";
import GraphView from 'app/ui/graph';
import { List, View } from "app/ui/list";

function createFunction(text) {
  return {
    type: "createNewFunction",
    text
  };
}
function cancelFunction(text) {
  return {
    type: "cancelNewFunction",
    text
  };
}

function _CreateFunctionView(props) {
  return (
    <div className="view-container">
      <h2>Create new function:</h2>
      <label htmlFor="label">Label:</label><input id="label" type="text" name="label" />
      <label htmlFor="body">Expression:</label><input id="body" type="text" name="body" />
      <button className="pure-button" onClick={props.cancel}>Cancel</button>
      <button className="pure-button" onClick={props.create}>Create</button>
    </div>
  );
}

const CreateFunctionView = connect(
  state => ({}),
  dispatch => ({
    create: text => dispatch(createFunction(text)),
    cancel: text => dispatch(cancelFunction())
  })
)(_CreateFunctionView);

class App extends Component {
  render() {
    return (      
      <div>
        <DevTools />
        <div className="pure-g">
          <List collection={['a', 'b', 'c']} />
          <View>
            <GraphView  />
          </View>
        </div>
      </div>
    );
  }
}

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById("application"));
