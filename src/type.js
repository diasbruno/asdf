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
