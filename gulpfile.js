const gulp = require('gulp');

require('./gulp/localization');
require('./gulp/build');

gulp.task('default', (done) => {
    console.log('This does nothing.')
    done();
});
