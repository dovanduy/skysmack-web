// DEPENDENCIES
const gulp = require('gulp');
const mergeJson = require('gulp-merge-json');
const plumber = require('gulp-plumber');

//#region LOCALIZATION
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
//#endregion

//#region WEB PROJECT
const webPaths = {
    project: './src/projects/web-portal',
    lib: './src/lib'
};
const webLocalizationOutputPath = `${webPaths.project}/src/i18n`;

// Translate once - keep this task name in sync with pack.json build script (currently 'gulp loc')
const webLocalization = (done) => gulp.parallel(runLocalization(webPaths, 'da', webLocalizationOutputPath), runLocalization(webPaths, 'en', webLocalizationOutputPath))(done);
const webLocalizationWatch = () => gulp.watch(getLocalizationWatchersArray(webPaths), webLocalization);
gulp.task('webLocalization', webLocalization);
gulp.task('webLocalizationWatch', webLocalizationWatch);
//#endregion

// DEFAULT
const defaultTasks = (done) => gulp.series(() => { })(done);
gulp.task('default', defaultTasks);