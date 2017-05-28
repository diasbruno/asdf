// import types from "./types";
import { tagged, taggedSum } from "daggy";

const Term = taggedSum({
  // type variable (alpha)
  TypeVar: ['name'],
  // type (uppercase lambda)
  TypeExp: ['name'],
  // function (lowercase lambda)
  FuncExp: ['name']
});
