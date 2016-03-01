/*global module, require */

var types = require("./type.js");

module.exports = {
  render: function(exp) {
    switch (exp.type) {
    case types.FUNCTION_EXP: {
      return this.render_function_exp(exp);
    } break;
    case types.TYPE_EXP: {
      return this.render_type_exp(exp);
    } break;
    }
    throw new Error("Cannot render expression:", exp);
  },
  render_function_exp: function(exp) {
    var str = "",
        wrapper = document.createElement("div");
    wrapper.className = "code-view exp-fn";
    str += this.name(exp.name);
    str += this.type_terms(exp.type_terms);
    str += this.fn_terms(exp.fn_terms);
    str += this.fn_body(exp.fn_body);
    wrapper.innerHTML = str;
    return wrapper;
  },
  render_type_exp: function(exp) {
    var str = "",
        wrapper = document.createElement("div");
    wrapper.className = "code-view exp-type";
    str += exp.name;
    wrapper.innerHTML = str;
    return wrapper;
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
      str += this.type_term(types.GREEK.ulambda + term_name);
      str += "<span>.</span>";
    }
    return str;
  },
  fn_term: function(term, type) {
    return "<span class=\"fn-term\">" + types.GREEK.llambda + term + this.fn_term_type(type) + "</span>";
  },
  fn_term_type: function(type) {
    if (type) {
      return "<sup>" + type.name + "</sup>";
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
