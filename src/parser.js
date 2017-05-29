import _ from 'lodash';
import Tokenizer from 'asdf/token';
import { Literal, Constr, Var, Lambda, Ident, Ty } from 'asdf/types';

function tokenTypeToType(tkt) {
  switch (tkt) {
  case 'n': return Ty('Int'); break;
  case 'str': return Ty('String'); break;
  }
  throw new Error(`cannot build type for tkt ${tkt}.`);
}

const stringer = JSON.stringify;

const mkLit = mkType => (token, type) =>
      Literal(mkType(token), tokenTypeToType(type));

const mkConstr = token => Constr(Ident(token));
const mkVar = token => Var(Ident(token));
const mkLambda = (pvar, expr) => Lambda(pvar, expr);

export const strLiteral = mkLit(String);
export const numLiteral = mkLit(Number);

function makeLambda(tail) {
  let args = _.takeWhile(tail, i => i.token != '.');
  return [mkLambda(args.map(a => mkVar(a.token)), null), _.drop(tail, args.length + 1)];
}

function make(b, tail) {
  const table = {
    'n': numLiteral,
    'str': strLiteral,
    'c': mkConstr,
    'i': mkVar
  };

  if (b.type == 'lambda') {
    return makeLambda(tail);
  }

  if (b.type in table) {
    return [table[b.type](b.token, b.type), tail];
  }

  throw new Error("cannot build ast.");
}

export function ast(a) {
  const token = Tokenizer('', a);
  let c = null;
  let tokens = [];
  while ((c = token.next())) {
    if (c == 'eof') break;
    tokens.push(c);
  }
  return tokens;
}

export function typer(a) {
  let b = ast(a);
  let asts = [];
  while (b.length > 0) {
    let h = _.head(b);
    let tail = _.tail(b);
    let [as, co] = make(h, tail);
    b = co;
    asts.push(as);
  }
  return asts;
}
