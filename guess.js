var fs = require('fs'),
    path = require('path'),
    pattern = 'test/**/*.js',
    packageData,
    testDir,
    babelrc;
packageData = require(path.join(process.cwd(), 'package.json'));
if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
    testDir = packageData.directories.test;
    pattern = testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/') + '**/*.js';
}
try {
  babelrc = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.babelrc'), 'utf-8'));
} catch (e) {
  babelrc = {};
}
require('./index')({
    cwd: process.cwd(),
    pattern: pattern,
    babelrc: babelrc
});
