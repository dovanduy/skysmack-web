// DEPENDENCIES
const gulp = require('gulp');
const mergeJson = require('gulp-merge-json');
const plumber = require('gulp-plumber');

const throwOnWrongPathsObject = (pathsObject) => {
    if (!pathsObject.project || !pathsObject.lib) {
        throw new Error('The paths object must define a project and lib property.')
    }
}

const runLocalization = (pathsObject, lang, outputPath) => {
    throwOnWrongPathsObject(pathsObject);
    return () => {
        return gulp.src([
            `${pathsObject.project}/**/${lang}.json`,
            `${pathsObject.lib}/**/${lang}.json`
        ])
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

const webPaths = {
    project: './apps/web/web-portal',
    lib: './libs'
};
const webLocalizationOutputPath = `${webPaths.project}/src/i18n`;

const webLocalization = (done) => gulp.parallel(runLocalization(webPaths, 'en', webLocalizationOutputPath) /*, runLocalization(webPaths, 'fr', webLocalizationOutputPath) */)(done);
const webLocalizationWatch = (done) => gulp.watch(getLocalizationWatchersArray(webPaths), webLocalization)(done);
gulp.task('webLocalization', webLocalization);
gulp.task('webLocalizationWatch', webLocalizationWatch);

// DEFAULT
function defaultTask(cb) {
    console.log(`\nRUNNING DEFAULT TASK - NOTE: IT DOES NOTHING\n(Pssst. try 'gulp webLocalization or 'gulp webLocalizationWatch' instead\n`);
    cb();
}


gulp.task('default', defaultTask);
