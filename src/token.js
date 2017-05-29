var _ = require('lodash');

var cm = ',';
var dt = '.';
export var sp = ' ';
export var nl = '\n';
var ob = '(';
var eb = ')';
var db = ':';
export var eof = 'eof';

function is_ident(ch) {
  return (ch >= 'A' && ch <= 'Z') ||
    (ch >= 'a' && ch <= 'z');
}

function is_space(ch) {
  return '\t' == ch || ' ' == ch || '\n' == ch;
}

function is_bracket(ch) {
  return /\(|\)|\{|\}|\[|\]/.test(ch);
}

function is_pontuation(ch) {
  return !is_ident(ch) && !is_bracket(ch) && !is_number(ch);
}

function is_number(ch) {
  return ch >= '0' && ch <= '9';
}

function stopAt(check) {
  return function(ch) {
    return check != ch;
  };
}

function Tokenizer(name, file) {
  if (!(this instanceof Tokenizer)) {
    return new Tokenizer(name, file);
  }

  // file
  this.name = name;
  this.file = file;
  this.size = file.length;
  // cursor
  this.column = 1;
  this.end    = 0;
  this.line   = 1;
  this.index  = 0;
  
  return this;
}

Tokenizer.prototype.readTill = function(expected, i) {
  var c = this.file[this.index];
  if (!_.isFunction(expected)) {
    var e = expected;
    expected = function(c) {
      return e == c;
    };
  }
  while (c && expected(c) && (this.index + i) < this.size) {
    c = this.file[this.index + (++i)];
  }
  return i;
};

Tokenizer.prototype.rewind = function() {
  this.index -= this.end;
  this.column -= this.end;
};

Tokenizer.prototype.next = function(keep_space) {
  var i = 0;

  keep_space = keep_space || false;
  var tp = '';
  this.column += this.end;
  var c = this.file[this.index];

  if (!keep_space && is_space(c)) {
    while (c && is_space(c) && (this.index + i) < this.size) {
      c = this.file[this.index + (++i)];
      if (c == nl) {
        this.column = 1;
      }
    }
    this.index += i;
    i = 0;
  }

  if (this.index >= this.size) {
    return eof;
  }

  if (c && (this.index) < this.size) {
    if (c == nl) {
      this.column = 0;
      this.line++;
      i++;
      tp = 's';
    }
    else if (c == '"' || c == "'") {
      this.index++;
      i = this.readTill(stopAt(c), i);
      tp = 'str';
    }
    else if (c == sp) {
      i = this.readTill(sp, i);
      tp = 's';
    }
    else if (c == 'λ') {
      i++;
      tp = 'lambda';
    }
    else if (is_bracket(c) || is_pontuation(c)) {
      i++;
      if (is_bracket(this.file[this.index+1])) {
        i++;
        tp = 'u';
      } else {
        tp = 'p';
      }
    }
    else if (is_number(c)) {
      i = this.readTill(is_number, i);
      tp = 'n';
    }
    else if (is_ident(c)) {
      i = this.readTill(is_ident, c != ':' ? i : i++);
      tp = 'i';
    }

  }

  var token = this.file.slice(this.index, this.index + i);

  if (tp == 'str') {
    i++;
  }
  
  if (tp == 'i' && /[A-Z]/.test(token[0])) {
    tp = 'c';
  }
  
  this.index += i;
  this.end = i;
  return {
    column: this.column,
    line: this.line,
    type: tp,
    token: token
  };
};

export default Tokenizer;
