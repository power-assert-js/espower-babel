import assert from 'power-assert';
import { spawn } from 'child_process';

describe('Gulp', () => {
  it('can run a task whose name contains a colon', (done) => {
    const gulp = spawn('gulp', ['test:issue-#24']);

    gulp.on('exit', (code) => {
      assert(code === 0);
      done();
    });
  });
});
