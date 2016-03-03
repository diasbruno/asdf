/*global module, require */

var types = require('./type');
var _ = require('lodash');

function assert_apply_type(a) {
  if (a.type != types.FUNCTION_EXP) {
    throw new Error("Cannot apply a type in a non-function.");
  }
  if (!a.type_terms && a.type_terms.length === 0) {
    throw new Error("Cannot apply type to function.");
  }
}

module.exports = {
  apply_type_fn_term: function(b, type) {
    return function(term) {
      if (term.has_type.name == type.name) {
        term.has_type.name = b.name;
      }
      return term;
    };
  },

  apply_type: function(a, b) {
    var data = {};
    assert_apply_type(a);
    var type = a.type_terms[0];
    data.type = types.FUNCTION_EXP;
    data.type_terms = a.type_terms.slice(1);
    data.fn_terms = _.map(a.fn_terms, this.apply_type_fn_term(b, type));
    data.fn_body = a.fn_body;
    return data;
  },

  eval_exp: function(a, b) {
    var typeA = a.type;
    var typeB = b.type;

    var result = {};

    switch(typeB) {
    case types.TYPE_EXP: {
      result = this.apply_type(a, b);
    } break;

    default: {
      throw new Error("Cannot evaluate expression.");
    } break;
    }

    return result;
  }

};
