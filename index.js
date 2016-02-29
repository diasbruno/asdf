(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../src/renderers.js":2}],2:[function(require,module,exports){
/*global module, require */

var types = require("./type.js");

module.exports = {
  render: function(exp) {
    var str = "<div class=\"code-view\">";
    str += this.name(exp.name);
    str += this.type_terms(exp.type_terms);
    str += this.fn_terms(exp.fn_terms);
    str += this.fn_body(exp.fn_body);
    str += "<\/div>";
    return str;
  },
  name: function(name) {
    return "<h6 class=\"fn-name\">" + name + "</h6>:</span>";
  },
  type_term: function(term) {
    return "<span class=\"type-term\">" + term + "</span>";
  },
  type_terms: function(ls) {
    var str = "", term_name;
    for (var a in ls) {
      term_name = ls[a].name;
      str += this.type_term(types.GREEK.ulambda + types.GREEK[term_name]);
      str += "<span>.</span>";
    }
    return str;
  },
  fn_term: function(term, type) {
    return "<span class=\"fn-term\">" + types.GREEK.llambda + term + this.fn_term_type(type) + "</span>";
  },
  fn_term_type: function(type) {
    if (type) {
      return "<sup>" + types.GREEK[type.name] + "</sup>";
    }
    return "";
  },
  fn_terms: function(ls) {
    var str = "", term_name, term_type;
    for (var a in ls) {
      term_name = ls[a].name;
      term_type = ls[a].has_type;
      str += this.fn_term(term_name, term_type);
      str += "<span>.</span>";
    }
    return str;
  },
  fn_body: function(ls) {
    var str = "";
    for (var a in ls) {
      str += ls[a].name;
    }
    return str;
  }
};

},{"./type.js":3}],3:[function(require,module,exports){
/*global module */

module.exports = {
  LITERAL: 1,            // litaral.
  VARIABLE: 2,           // simple variable.

  TYPE: 3,               // known type (starts with a capital letter) and should not be greek (sorry, Greece).
  TYPE_VARIABLE: 4,      // variable with type varialbe (starts with lowercase letter).
  POLY_TYPE_VARIABLE: 5, // uppercase lambda.

  TERM: 6,               // argument of a function.
  BODY: 7,               // body of a function.
  FUNCTION: 8,           // declaration of a function.

  GREEK: {
    "ulambda": "&#x1D6B2;",
    "llambda": "&#x1D6CC;",
    "lalpha": "&#x1D6C2;",
    "rarrow": "&rarr;",
    "lbeta": "&#x1D6C3;"
  }

};

},{}]},{},[1]);
