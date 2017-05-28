import _ from 'lodash';
import { Some, None } from 'app/functional';;
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect, bindActionCreators } from "app/state";
import {
  CREATE_NODE, REMOVE_NODE, UPDATE_NODE_TEXT,
  SELECTED_NODE
} from 'app/constants';
import { clamp } from 'app/math';

function createNode() {
  return { type: CREATE_NODE };
}

function selectedNode(nid) {
  return { type: SELECTED_NODE, nid };
}

function updateNodeText(nid, text) {
  return { type: UPDATE_NODE_TEXT, nid, text };
}

function removeNode(nid) {
  return { type: REMOVE_NODE, nid };
}

let graphFrame = { top: 0, left: 0, right: 0, bottom: 0 };
let domNode = null;
let initPoX = 0;
let initPoY = 0;

const px = value => value + "px";

const Node = connect(
  (state, props) => ({ ...props, isCurrent: Some(props.nid).equals(state.graph.selected) }),
  dispatch => bindActionCreators({ removeNode, selectedNode }, dispatch)
)(class _Node extends Component {
  constructor(props) {
    super(props);
    this.state = { isdragging: false };
  }

  forwardRemove = () => {
    domNode = null;
    this.setState({
      ...this.state,
      isdragging: false
    }, () => {
      document.removeEventListener('mousemove', this.mouseMove);
      this.props.removeNode(this.props.nid);
    });
  }

  mouseMove = (event) => {
    const fY = event.pageY - initPoY - graphFrame.top;
    const fX = event.pageX - initPoX - graphFrame.left;
    const nodeFrame = domNode.getBoundingClientRect();
    domNode.style.top = px(clamp(0, fY, graphFrame.height - nodeFrame.height));
    domNode.style.left = px(clamp(0, fX, graphFrame.width - nodeFrame.width));
  }

  selectNode = (event) => {
    const node = findDOMNode(this.ref);
    const nodeFrame = node.getBoundingClientRect();
    domNode = node;
    initPoX = event.pageX - nodeFrame.left;
    initPoY = event.pageY - nodeFrame.top;

    if (event.target == this.ref && !this.state.isdragging) {
      this.setState({
        ...this.state,
        isdragging: true
      }, () => {
        document.addEventListener('mousemove', this.mouseMove);
      });
    }
    if (this.state.isdragging) {
      this.setState({
        ...this.state,
        isdragging: false
      }, () => {
        document.removeEventListener('mousemove', this.mouseMove);
      });
    }
    !this.props.isCurrent && this.props.selectedNode(this.props.nid);
  }

  render() {
    const { editing } = this.state;
    const { nid, text, isCurrent } = this.props;

    return (
      <div ref={r => { this.ref = r; }}
        key={nid} className={`node ${isCurrent ? "selected" : ""} ${text.length == 0 ? "empty" : ""}`}
        onClick={this.selectNode}>
        <span>{text}</span>
      </div>
    );
  }
});

function keyboardEventHasCtrlChar(event) {
  return event.ctrlKey || event.altKey || event.metaKey || event.keyCode == 13 || event.keyCode == 8;
}

function keyboardEventWasCleanUp(event) {
  return event.keyCode == 8 && !(event.nativeEvent.target.selectionEnd - event.nativeEvent.target.selectionStart == 0);
}

function actualInputValue(event) {
  let value = event.target.value;
  if (event.keyCode == 8) {
    value = keyboardEventWasCleanUp(event) ? "" : value.slice(0, value.length - 1);
  }
  return value + (keyboardEventHasCtrlChar(event) ? "" : event.key);
}

const GREEK = {
  "lalpha": "&#x1D6C2;",
  "rarrow": "&rarr;",
  "larrow": "&larr;",
  "lbeta": "&#x1D6C3;",
  "gamma": "Γ",
  "ppi": "Π",
  "mu": "μ",
  "eta": "η",
  "theta": "θ",
  "pho": "ρ",
  "pi": "π",
  "type": "Λ",
  "fn": "λ",
  "and": "∧",
  "or": "∨",
  "forall": "∀",
  "exists": "∃",
  "nexists": "∄",
  "empty": "∅",
  "top": "⊤",
  "bottom": "⊥",
  "gf": "∘"
};

const GraphView = connect(
  state => _.pick(state.graph, ['nodes', 'selected']),
  dispatch => bindActionCreators({ createNode, updateNodeText }, dispatch)
)(props => {
  const nodes = _.map(props.nodes, node => (
    <Node key={node.nid}
          isCurrent={Some(node.nid).equals(props.selected)}
          {...node}  />
  ));
  return (
    <div>
      <input className="pure-input" type="text" name="text" onKeyDown={(event) => {
          let text = actualInputValue(event);
          const word = /\:([A-Za-z0-9]+)/.exec(text);
          if (word && word[1] in GREEK) {
            text = text.replace(":"+word[1], GREEK[word[1]]);
            event.target.value = text;
          }
          props.selected.chain(nid => props.updateNodeText(nid, text));
        }} />
      <div className="pure-g">
        <button className="pure-button" onClick={props.createNode}>Add</button>
      </div>
      <div ref={r => { if (r) graphFrame = r.getBoundingClientRect(); }}
           className="graph">{nodes}</div>
    </div>
  );
});


export default GraphView;
