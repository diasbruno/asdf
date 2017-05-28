import _ from 'lodash';
import { Some, None } from 'app/functional';;
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect, bindActionCreators } from "app/state";
import { clamp } from 'app/math';
import {
  CREATE_NODE, REMOVE_NODE, UPDATE_NODE_TEXT,
  SELECTED_NODE, DESELECTED_NODE,
  GREEK
} from 'app/constants';

function createNode() {
  return { type: CREATE_NODE };
}

function selectNode(nid, swap) {
  return { type: SELECTED_NODE, nid, swap };
}

function deselectNode() {
  return { type: DESELECTED_NODE };
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
  (state, props) => ({
    ...props,
    isSelected: _.includes(state.graph.selected, props.nid)
  }),
  dispatch => bindActionCreators({ removeNode, selectNode }, dispatch)
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
    if (domNode) {
      const node = findDOMNode(this);
      const fY = event.pageY - initPoY - graphFrame.top;
      const fX = event.pageX - initPoX - graphFrame.left;
      const nodeFrame = node.getBoundingClientRect();
      domNode.style.top = px(clamp(0, fY, graphFrame.height - nodeFrame.height));
      domNode.style.left = px(clamp(0, fX, graphFrame.width - nodeFrame.width));
    }
  }

  selectNode = (event) => {
    !this.props.isSelected && this.props.selectNode(this.props.nid, !event.nativeEvent.shiftKey);
  }

  toggleDragging = (event) => {
    const node = findDOMNode(this);
    const nodeFrame = node.getBoundingClientRect();
    const { isdragging } = this.state;

    if (!isdragging) {
      domNode = node;
      initPoX = event.pageX - nodeFrame.left;
      initPoY = event.pageY - nodeFrame.top;
    } else {
      domNode = null;
      initPoX = 0;
      initPoY = 0;
    }

    this.setState({
      ...this.state,
      isdragging: !isdragging
    }, () => {
      const toggleListener = isdragging ? 'removeEventListener' : 'addEventListener';
      document.body[toggleListener]('mousemove', this.mouseMove);
    });
  }

  render() {
    const { editing } = this.state;
    const { nid, text, isSelected } = this.props;

    return (
      <div key={nid} className={`node ${isSelected ? "selected" : ""} ${text.length == 0 ? "empty" : ""}`}
           onMouseDown={this.toggleDragging}
           onMouseUp={this.toggleDragging}
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

const GraphView = connect(
  state => _.pick(state.graph, ['nodes', 'selected']),
  dispatch => bindActionCreators({ createNode, updateNodeText, deselectNode }, dispatch)
)(class _GraphView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    document.body.addEventListener('click', this.forwardDeselectNode);
  }

  componentWillUnmount = () => {
    document.body.removeEventListener('click', this.forwardDeselectNode);
  }

  isGraph = element => {
    return element.className == "graph";
  }

  forwardDeselectNode = event => {
    const { selected } = this.props;
    const isDeselecting = this.isGraph(event.target) && selected.length > 0;
    isDeselecting && this.props.deselectNode();
  }

  render () {
    const { nodes, selected, createNode, updateNodeText } = this.props;
    const nodesElements = _.map(
      nodes, node => (
        <Node key={node.nid}
              isCurrent={Some(node.nid).equals(selected)}
              {...node}  />
      )
    );

    return (
      <div>
        <input className="pure-input" type="text" name="text" onKeyDown={(event) => {
            let text = actualInputValue(event);
            const word = /\:([A-Za-z0-9]+)/.exec(text);
            if (word && word[1] in GREEK) {
              text = text.replace(":"+word[1], GREEK[word[1]]);
              event.target.value = text;
            }
            selected.chain(nid => updateNodeText(nid, text));
          }} />
          <div className="pure-g">
            <button className="pure-button" onClick={createNode}>Add</button>
          </div>
          <div ref={r => { if (r) graphFrame = r.getBoundingClientRect(); }}
            className="graph">{nodesElements}</div>
      </div>
    );
  }
});

export default GraphView;
