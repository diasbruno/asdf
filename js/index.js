/*global require */

var $ = require('jquery');
var asdf = require("../src/renderers.js");
var objs = require("../src/objects.js");
var ev = require("../src/eval.js");

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

var promise1 = $.ajax("id.json");
var promise2 = $.ajax("typeU.json");

$.when(promise1, promise2).done(function(data1, data2) {
  var as = [data1[0], data2[0]];
  for (var a in as) {
    var data = as[a];
    build(data);
  }

  build(ev.eval_exp(data1[0], data2[0]));
});
