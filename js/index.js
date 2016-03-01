/*global require, $ */

var asdf = require("../src/renderers.js");
var objs = require("../src/objects.js");

var create_type = document.getElementById("create-type");
var create_fn   = document.getElementById("create-fn");

create_type.onclick = function(ev) {
  // console.log("type", ev);
};

create_fn.onclick = function(ev) {
  // console.log("fn", ev);
};

function build(data) {
  var exp = asdf.render(data);
  document.body.appendChild(exp);
}

$.get('id.json', build);
$.get('typeU.json', build);
