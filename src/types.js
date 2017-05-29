import { tagged, taggedSum } from "daggy";

export const NUMBER_LITERAL = "number literal";

export const Term = taggedSum({
  Literal: ['value', 'type'],
  Constr: ['value'],
  Var: ['value'],
  Lambda: ['arg', 'expr']
});

export const Ident = tagged('value');

export const Type = taggedSum({
  Ty: ['value']
});

const { Ty } = Type;
const { Literal, Constr, Var, Lambda } = Term;

export { Literal, Constr, Var, Lambda, Ty };
