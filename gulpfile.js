/**
 * gulpfile.js for ./test/issues/24
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha');

// Since the `--compiers` option is not available in gulp-mocha,
// registering a require hook is needed to make Mocha work with espower-babel.
require('./guess');

gulp.task('test:issue-#24', function() {
  // This gulp task is expected to run a espowered Mocha test successfully.
  return gulp.src('./test/person_test.js')
    .pipe(mocha());
});
