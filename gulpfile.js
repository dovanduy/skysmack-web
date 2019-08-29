const gulp = require('gulp');

require('./gulp/localization');
require('./gulp/build');

gulp.task('default', (done) => {
    webLocalization(done);
    webCommercialLocalization(done);
    done();
});
