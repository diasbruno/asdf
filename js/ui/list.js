import React from "react";

export function ListItem(item, k) {
  return <li key={k}>{item}</li>;
}

export function List(props) {
  const ls = props.collection.map(ListItem);
  return (
    <div className="pure-u-1-4 database-list">
      <ul className="pure-menu-list">{ls}</ul>
    </div>
  );
}

export function View(props) {
  return (
    <div className="pure-u-3-4">
      {props.children}
    </div>
  );
}
