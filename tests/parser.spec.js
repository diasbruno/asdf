/*global require, describe, it */

import should from 'should';
import { typer } from 'asdf/parser';

describe("typer", () => {
  it("should build a number literal.", () => {
    should(typer("1")[0]).be.eql({ value: 1, type: { value: 'Int' } });
  });

  it("should build a string literal.", () => {
    should(typer("\"asdf\"")[0]).be.eql({ value: "asdf", type: { value: 'String' } });
  });

  it("should build a constructor.", () => {
    should(typer("T")[0]).be.eql({ value: { value: "T" } });
  });

  it("should build a var.", () => {
    should(typer("x")[0]).be.eql({ value: { value: "x" } });
  });

  it("should build a lambda.", () => {
    should(typer("λx. x")[0]).be.eql({
      args: [{ value: { value: "x" } }],
      expr: null
    });
  });
});
