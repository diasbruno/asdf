import * as types from "./types";

export function render(exp) {
  switch (exp.type) {
  case types.FUNCTION_EXP: {
    return render_function_exp(exp);
  } break;
  case types.TYPE_EXP: {
    return render_type_exp(exp);
  } break;
  }
  throw new Error("Cannot render expression:", exp);
}

export function render_function_exp(exp) {
  return (
    <div className="code-view exp-fn">
      {name(exp.name)}
      {type_terms(exp.type_terms)}
      {fn_terms(exp.fn_terms)}
      {fn_body(exp.fn_body)}
    </div>
  );
}

export function render_type_exp(exp) {
  return (
    <div className="code-view exp-type">
      {name(exp.name)}
    </div>
  );
}

export function name(name) {
  if (!name || name === "") {
    return null;
  }

  return (
    <h6 className="fn-name">{name}</h6>
  );
}

export function type_term(term) {
  return <span class="type-term">{term}</span>;
}

export function type_terms(ls) {
  return ls.map(term => (
    <span>
      {type_term(types.GREEK.ulambda + term)}
      <span>.</span>
    </span>
  ));
}

export function fn_term(term, type) {
  return (
    <span class="fn-term">
      {types.GREEK.llambda}{term}{fn_term_type(type)}
    </span>
  );
}

export function fn_term_type(type) {
  if (type) {
    return <sup>{type.name}</sup>;
  }
  return null;
}

export function fn_terms(ls) {
  return ls.map(term => (
    <span>
      {fn_term(term.name, term.has_type)}
      <span>.</span>
    </span>
  ));
}

export function fn_body(ls) {
  return ls.map(term => <span>{term.name}</span>);
}
