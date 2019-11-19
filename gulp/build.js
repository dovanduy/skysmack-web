// ============
// Dependencies
// ============
const gulp = require('gulp');
const replace = require('gulp-string-replace');
const brotli = require('gulp-brotli');
const gzip = require('gulp-gzip');
const htmlmin = require('gulp-htmlmin');


// =================
// Tasks
// =================
const updateNgswPortal = (done) => {
    gulp.src(["./dist/apps/web/web-portal/ngsw.json"])
        .pipe(replace('https://cdn.skysmack.net/index.html', '/index.html'))
        .pipe(replace('https://cdn.skysmack.net/ngsw-worker.js', '/ngsw-worker.js'))
        .pipe(replace('https://cdn.skysmack.net/assets/icons/site.webmanifest', '/assets/icons/site.webmanifest'))
        .pipe(replace('https://cdn.skysmack.net/assets/icons/browserconfig.xml', '/assets/icons/browserconfig.xml'))
        .pipe(gulp.dest('./dist/apps/web/web-portal/'));
    done();
};

const brotliPortal = (done) => {
    gulp.src(['./dist/apps/web/web-portal/**', '!./**/*.br', '!./**/*.gz'])
        .pipe(brotli.compress({
            skipLarger: true,
            mode: 0,
            quality: 11,
            lgblock: 0
        }))
        .pipe(gulp.dest('./dist/apps/web/web-portal/'));
    done();
};

const zipPortal = (done) => {
    gulp.src(['./dist/apps/web/web-portal/**', '!./**/*.br', '!./**/*.gz'])
        .pipe(gzip({
            skipGrowingFiles: true,
            level: 9
        }))
        .pipe(gulp.dest('./dist/apps/web/web-portal/'));
    done();
};

const minifyPortal = (done) => {
    gulp.src('./dist/apps/web/web-portal/*.html')
        // For all options, see:
        // https://www.npmjs.com/package/html-minifier#options-quick-reference
        .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true }))
        .pipe(gulp.dest('./dist/apps/web/web-portal/'));
    done();
};

const brotliCommercial = (done) => {
    gulp.src(['./dist/apps/web/web-commercial/**', '!./**/*.br', '!./**/*.gz'])
        .pipe(brotli.compress({
            skipLarger: true,
            mode: 0,
            quality: 11,
            lgblock: 0
        }))
        .pipe(gulp.dest('./dist/apps/web/web-commercial/'));
    done();
};

const zipCommercial = (done) => {
    gulp.src(['./dist/apps/web/web-commercial/**', '!./**/*.br', '!./**/*.gz'])
        .pipe(gzip({
            skipGrowingFiles: true,
            level: 9
        }))
        .pipe(gulp.dest('./dist/apps/web/web-commercial/'));
    done();
};

const minifyCommercial = (done) => {
    gulp.src('./dist/apps/web/web-commercial/*.html')
        // For all options, see:
        // https://www.npmjs.com/package/html-minifier#options-quick-reference
        .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true }))
        .pipe(gulp.dest('./dist/apps/web/web-commercial/'));
    done();
};

// ===================
// Register tasks
// ===================
gulp.task('update-ngsw-portal', updateNgswPortal);
gulp.task('brotli-portal', brotliPortal);
gulp.task('zip-portal', zipPortal);
gulp.task('minify-portal', minifyPortal);

gulp.task('brotli-commercial', brotliCommercial);
gulp.task('zip-commercial', zipCommercial);
gulp.task('minify-commercial', minifyCommercial);
