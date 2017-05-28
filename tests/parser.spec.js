/*global require, describe, it */

import should from 'should';
import Parser from 'asdf/parser';

describe("Parser", function() {
  it("should parse a simple variable name.", function() {
    should(Parser(false)).be.empty();
  });
  it("should parse a simple variable name.", function() {
    should(Parser(true)).be.empty();
  });
});
