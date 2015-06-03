var path = require('path'),
    resolveBabelrc = require('./lib/babelrc-util').resolveBabelrc,
    pattern = 'test/**/*.js',
    packageData,
    testDir,
    babelrc,
    extension = '.js';

// Override extension via `mocha --compilers <extension>:espower-babel/guess`
process.argv.forEach(function(arg){
    if (arg.indexOf(':espower-babel/guess') === -1) {
        return;
    }

    extension = '.'+arg.split(':')[0];
});

packageData = require(path.join(process.cwd(), 'package.json'));
if (packageData &&
    typeof packageData.directories === 'object' &&
    typeof packageData.directories.test === 'string') {
    testDir = packageData.directories.test;
    pattern = testDir + ((testDir.lastIndexOf('/', 0) === 0) ? '' : '/') + '**/*'+extension;
}

babelrc = resolveBabelrc(process.cwd(), {});

require('./index')({
    cwd: process.cwd(),
    pattern: pattern,
    babelrc: babelrc,
    extension: extension
});
