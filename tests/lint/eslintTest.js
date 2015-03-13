'use strict';

var lint = require('mocha-eslint');

var paths = [
  'bin',
  'lib',
  'tests',
];
var options = {};
options.formatter = 'stylish';

lint(paths, options);
