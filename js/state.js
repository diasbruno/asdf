import React from "react";
export { Provider, connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
export {
  createStore, applyMiddleware,
  combineReducers, bindActionCreators
} from 'redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import {
  CREATE_NODE, REMOVE_NODE, UPDATE_NODE_TEXT,
  SELECTED_NODE, DESELECTED_NODE
} from 'app/constants';

// createDevTools takes a monitor and produces a DevTools component
export const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is visible by default.
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               defaultIsVisible >
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

const unique = (function() {
  let id = 0;
  return () => id += 1;
}());

const initialState = {};

const graphInitialState = {
  nodes: {},
  selected: []
};

function graphState(state, action) {
  switch(action.type) {
  case CREATE_NODE: {
    const nid = unique();
    const nodes = { ...state.nodes, [nid]: { nid, text: "" } };
    return { ...state, nodes };
  } break;
  case REMOVE_NODE: {
    const nodes = { ...state.nodes };
    delete nodes[action.nid];
    return { ...state, nodes, selected: [] };
  } break;
  case SELECTED_NODE: {
    const newSelection = [action.nid];
    const selected = action.swap ? newSelection : state.selected.concat(newSelection);
    return { ...state, selected };
  } break;
  case DESELECTED_NODE: {
    return { ...state, selected: [] };
  } break;
  case UPDATE_NODE_TEXT: {
    const { text, nid } = action;
    const node = { ...state.nodes[nid], text: text };
    return { ...state, nodes: { ...state.nodes, [nid]: node } };
  } break;
  }
  return graphInitialState;
}

const fns = combineReducers({
  graph: graphState
});

export default createStore(
  fns,
  {},
  DevTools.instrument()
);
