import types from "./types";

export default {
  apply_type: function (a) {
    const { type, type_terms } = a;
    if (type != types.FUNCTION_EXP) {
      throw new Error("Cannot apply a type in a non-function.");
    }
    if (!type_terms && type_terms.length === 0) {
      throw new Error("Cannot apply type to function.");
    }
  }
};
