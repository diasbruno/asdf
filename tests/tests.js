/*global require, describe, it */

var assert = require('assert');
var fs = require('fs');
var _ = require('lodash');
var ev = require('../src/eval');

var types = require('../src/type.js');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

var idFn = readJson('id.json');
var typeU = readJson('typeU.json');

describe('Eval system f expressions.', function() {
  describe('eval function with type.', function () {
    it('should return a function applied with a given type.', function () {
      assert.equal(ev.eval_exp(idFn, typeU), {
        "type": 8,
        "type_terms": [],
        "fn_terms": [{
          "has_type": {
            "name": "U",
            "type": 4
          },
          "name": "x",
          "type": 2
        }],
        "fn_body": [{
          "name": "x",
          "type": 7
        }]
      });
    });
  });
});
