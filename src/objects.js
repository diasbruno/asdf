"use strict";

import * as types from "./types";

export default {
  term: function(type, name) {
    return {
      "type": type,
      "name": name
    };
  },
  type_term: function(name) {
    return this.term(types.POLY_TYPE_VARIABLE, name);
  },
  fn_term: function(name, type) {
    var term = this.term(types.VARIABLE, name);
    term.has_type = type;
    return term;
  },
  fn_body: function(name) {
    return this.term(types.BODY, name);
  },
  type_var: function(name) {
    return this.term(types.TYPE_VARIABLE, name);
  },
  type: function(name) {
    return this.term(types.TYPE, name);
  }
};
