// ============
// Dependencies
// ============
const gulp = require('gulp');
const mergeJson = require('gulp-merge-json');
const plumber = require('gulp-plumber');
var replace = require('gulp-string-replace');
var brotli = require('gulp-brotli');
var gzip = require('gulp-gzip');

gulp.task('update-ngsw-portal', function() {
    gulp.src(["./dist/apps/web/web-portal/ngsw.json"])
      .pipe(replace('https://cdn.skysmack.net/index.html', '/index.html'))
      .pipe(replace('https://cdn.skysmack.net/ngsw-worker.js', '/ngsw-worker.js'))
      .pipe(replace('https://cdn.skysmack.net/assets/icons/site.webmanifest', '/assets/icons/site.webmanifest'))
      .pipe(replace('https://cdn.skysmack.net/assets/icons/browserconfig.xml', '/assets/icons/browserconfig.xml'))
      .pipe(gulp.dest('./dist/apps/web/web-portal/'))
  });


gulp.task('brotli-portal', function() {
    return gulp.src(['./dist/apps/web/web-portal/**', '!./**/*.br', '!./**/*.gz'])
    .pipe(brotli.compress())
    .pipe(gulp.dest('./dist/apps/web/web-portal/'));
});
  
gulp.task('zip-portal', function() {
    return gulp.src(['./dist/apps/web/web-portal/**', '!./**/*.br', '!./**/*.gz'])
    .pipe(gzip())
    .pipe(gulp.dest('./dist/apps/web/web-portal/'));
});

// ============================
// Localization reusable logic
// ============================
const throwOnWrongPathsObject = (pathsObject) => {
    if (!pathsObject.project || !pathsObject.lib) {
        throw new Error('The paths object must define a project and lib property.')
    }
}
const runLocalization = (pathsObject, lang, jsonPrefixes, outputPath) => {
    throwOnWrongPathsObject(pathsObject);

    // Add 
    const src = [];
    for (let index = 0; index < jsonPrefixes.length; index++) {
        const prefix = jsonPrefixes[index];
        const projectJsons = `${pathsObject.project}/**/${prefix}.json`;
        const libJsons = `${pathsObject.lib}/**/${prefix}.json`;

        src.push(projectJsons);
        src.push(libJsons)
    }

    return () => {
        return gulp.src(src.concat([
            `${pathsObject.project}/**/${lang}.json`,
            `${pathsObject.lib}/**/${lang}.json`
        ]))
            .pipe(plumber())
            .pipe(mergeJson({ fileName: `${lang}.json` }))
            .pipe(gulp.dest(outputPath))
    };
};

const getLocalizationWatchersArray = (pathsObject) => {
    throwOnWrongPathsObject(pathsObject);
    return [
        // Json
        `${pathsObject.project}/src/**/*.json`,
        `${pathsObject.lib}/**/*.json`,
        // TS
        `${pathsObject.project}/src/**/*.ts`,
        `${pathsObject.lib}/**/*.ts`,
        // HTML
        `${pathsObject.project}/src/**/*.html`,
        `${pathsObject.lib}/**/*.html`,
        // Ignore
        `!${pathsObject.project}/src/i18n/**/*.json`
    ];
}

// ============================
// Localization for Web project
// ============================
const webPaths = {
    project: './apps/web/web-portal',
    lib: './libs'
};
const webLocalizationOutputPath = `${webPaths.project}/src/i18n`;

const webCommercialPaths = {
    project: './apps/web/web-commercial',
    lib: './libs'
};
const webCommercialLocalizationOutputPath = `${webCommercialPaths.project}/src/i18n`;

// =================
// Define gulp tasks
// =================
const webLocalizationWatch = (done) => {
    gulp.watch(getLocalizationWatchersArray(webPaths), webLocalization)(done);
    done();
};

const webLocalization = (done) => {
    gulp.parallel(
        runLocalization(webPaths, 'en', ['portal.en'], webLocalizationOutputPath),
    )(done); // Remember: Multiple runLocalization() functions can be used in parallel
    done();
};

const webCommercialLocalization = (done) => {
    gulp.parallel(
        runLocalization(webCommercialPaths, 'en', ['commercial.en'], webCommercialLocalizationOutputPath),
    )(done); // Remember: Multiple runLocalization() functions can be used in parallel
    done();
};

const defaultTask = (done) => {
    webLocalization(done);
    webCommercialLocalization(done);
    done();
}

// ===================
// Register gulp tasks
// ===================
gulp.task('webLocalizationWatch', webLocalizationWatch);
gulp.task('webCommercialLocalization', webCommercialLocalization);
gulp.task('webLocalization', webLocalization);
gulp.task('default', defaultTask);
