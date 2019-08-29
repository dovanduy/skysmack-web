// ============
// Dependencies
// ============
const gulp = require('gulp');
const mergeJson = require('gulp-merge-json');
const plumber = require('gulp-plumber');

// ============================
// Reusable logic
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
// Web project paths
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
// Tasks
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

// ===================
// Register tasks
// ===================
gulp.task('webLocalizationWatch', webLocalizationWatch);
gulp.task('webCommercialLocalization', webCommercialLocalization);
gulp.task('webLocalization', webLocalization);
