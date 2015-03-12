var path = require('path'),
    resolveBabelrc = require('./lib/resolve-babelrc'),
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

babelrc = resolveBabelrc(process.cwd(), {});

require('./index')({
    cwd: process.cwd(),
    pattern: pattern,
    babelrc: babelrc
});
