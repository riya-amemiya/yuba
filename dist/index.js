"use strict";

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var yuba_command = ["y "];
var js_command = [["console.log(", 1, ');\n']];
var out = "";
var inpfile = "";

var check = function check(file) {
  var hasfaile = false;

  try {
    _fs["default"].statSync(file);

    hasfaile = true;
  } catch (err) {
    hasfaile = false;
  }

  return hasfaile;
};

var read = function read(file) {
  if (check(file)) {
    ;
    inpfile = _fs["default"].readFileSync(file, 'utf8');
  }

  return inpfile;
};

var inp = read('src/index.yuba').replace(/\n/g, '').split(/;/);

for (var i in inp) {
  inp[i] = inp[i].split(/"/);
}

console.log(inp);

for (var _i in inp) {
  for (var u in yuba_command) {
    if (~inp[_i][0].indexOf(yuba_command[u])) {
      for (var f in js_command[u]) {
        if (typeof js_command[u][f] == 'number') {
          var n = "".concat(inp[_i][f]);
          var m = n[new Date() % n.length];
          out += "\"\u30D5\u30F3\u3002".concat(n, "\u3068\u3044\u3046\u306E\u304B\u3044\u3002\u8D05\u6CA2\u306A\u540D\u3060\u306D\u3047\u3002\u4ECA\u304B\u3089\u304A\u524D\u306E\u540D\u524D\u306F").concat(m, "\u3060\u3002\u3044\u3044\u304B\u3044\u3001").concat(m, "\u3060\u3088\u3002\u5206\u304B\u3063\u305F\u3089\u8FD4\u4E8B\u3092\u3059\u308B\u3093\u3060\u3001").concat(m, "!!\"");
        } else {
          out += js_command[u][f];
        }
      }
    }
  }
}

console.log(out);
out = out.replace(/\n/g, '');

if (!check('build_yuba')) {
  _fs["default"].mkdir('build_yuba', function (err) {
    if (err) {
      throw err;
    }
  });
}

_fs["default"].writeFile('build_yuba/build.js', out, function (err) {
  if (err) {
    throw err;
  }

  console.log('build_yuba/build.jsが作成されました');
});