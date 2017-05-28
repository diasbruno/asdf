import types from './types';
import asserts from "./asserts";
import _ from 'lodash';

export function apply_type_fn_term(b, type) {
  return term => {
    if (term.has_type.name == type.name) {
      term.has_type.name = b.name;
    }
    return term;
  };
}

export function apply_type(a, b) {
  var data = {};
  asserts.apply_type(a);
  var type = a.type_terms[0];
  data.name = "";
  data.type = types.FUNCTION_EXP;
  data.type_terms = a.type_terms.slice(1);
  data.fn_terms = _.map(a.fn_terms, apply_type_fn_term(b, type));
  data.fn_body = a.fn_body;
  return data;
}

export function eval_exp(a, b) {
  // var typeA = a.type;
  var typeB = b.type;
  var result = {};

  switch(typeB) {
  case types.TYPE_EXP: {
    result = apply_type(a, b);
  } break;

  default: {
    throw new Error("Cannot evaluate expression.");
  } break;
  }

  return result;
}
