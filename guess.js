var path = require('path'),
    pattern = 'test/**/*.js',
    packageData,
    testDir;
packageData = require(path.join(process.cwd(), 'package.json'));
if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
    testDir = packageData.directories.test;
    pattern = testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/') + '**/*.js';
}
require('./index')({
    cwd: process.cwd(),
    pattern: pattern
});
