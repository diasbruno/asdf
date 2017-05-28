import Option, { None } from 'fantasy-options';
export { Some, None } from 'fantasy-options';

Option.prototype.equals = function(b) {
  if (typeof this != typeof b) {
    return false;
  }
  return (this == None && b == None) || this.x == b.x;
};
