# New Skysmack Package

Consider using the quick-naming.md guide for faster copy paste.

- packages/packages-<name> (LOGIC)
- ng-skysmack/projects/src/ng-packages/<name> (NG LOGIC)
- ng-skysmack/projects/src/portal-packages/<name> (NG VIEWS)
- ng-skysmack/src/web-portal/src/app (WEB HOOKUP)
    /packages
        modules/<name>_wrapper.module.ts
        <name>-package-manifest.ts <-- REMEMBER ICON! https://material.io/tools/icons/
    /start
        start.module.ts
        application-startup.ts
- Update .json files
    skysmack/package.json
    skysmack/ng-packages/projects/ng-packages/ng-package.json
    skysmack/ng-packages/projects/ng-packages/package.json
    skysmack/ng-packages/projects/portal-packages/package.json
    skysmack/ng-packages/projects/portal-packages/ng-package.json ???
- Update skysmack/Assorted/scripts/clean.bat
- Double check ALL index files are updated correctly. Remember /index for folder exports. Especially check:
    ng-packages/src/lib/index.ts
    portal-packages/src/lib/index.ts
    USE CONTROL + H AND SEARCH FOR THE TYPE YOU SCAFFOLDED FROM e.g.: export * from './person
- REMEMBER
    + Update column names in component.index.ts files
    + Update validations, fieldsConfig, i18n, etc.
    + Add additional paths if needed to both requets AND actions.
- Run `npm run ss:rebuild` from ng-skysmack
- If needed, stop lerna watch and start it again: Run `npm run ss:lerna:watch` from ng-skysmack