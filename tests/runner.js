'use strict';

var glob = require('glob');
var Mocha = require('mocha');


require('traceur').require.makeDefault(function (filename) {
// don't transpile our dependencies, just our app
//The first check is if you develop locally, the second for the globally installed moduel
  return (filename.indexOf('node_modules') === -1) ||
    (filename.indexOf('/node_modules/sane-cli/') > -1 && filename.indexOf('/node_modules/sane-cli/node_modules') === -1);
}, {asyncFunctions: true});

var mocha = new Mocha({
  // For some reason, tests take a long time on Windows (or at least AppVeyor)
  timeout: (process.platform === 'win32') ? 90000 : 18000,
  reporter: 'spec'
});

// Determine which tests to run based on argument passed to runner
var arg = process.argv[2];
if (!arg) {
  var root = 'tests/{unit,acceptance,lint}';
} else if (arg === 'lint') {
  var root = 'tests/lint';
} else {
  var root = 'tests/{unit,acceptance}';
}

function addFiles(mocha, files) {
  glob.sync(root + files).forEach(mocha.addFile.bind(mocha));
}

addFiles(mocha, '/**/*Test.js');

mocha.run(function (failures) {
  process.on('exit', function () {
    process.exit(failures);
  });
});
