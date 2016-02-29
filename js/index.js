/*global require */

var asdf = require("../src/renderers.js");

var exp = {
  "type": 8,
  "name": "id",
  "type_terms": [{
    type: 5,
    name: "lalpha"
  }],
  "fn_terms": [{
    type: 2,
    name: "x",
    has_type: {
      type: 4,
      name: "lalpha"
    }
  }],
  "fn_body": [{
    type: 1,
    name: "x"
  }]
};

var rendered_exp = asdf.render(exp);
document.body.innerHTML = rendered_exp;
