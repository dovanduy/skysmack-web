# New npm package

- Run `ng g library <name>` - answer below to the following questions
    - packages (needs to be typed)
    - Typescript
    - Press enter - no tags needed
    - Jest
- Go to the new package. Remove all generated files, except those in the src folder
- From another package, copy the config files:
    ng-package-config.js (remember to rename contents to correct package name!)
    ng-packagr-api.js
    package.json (remember to rename contents to correct package name! + add dependencies if any)
    public_api.ts
    tsconfig.ngc.json
- Update root config files
    - tsconfig.json (ensure the new package is added + the path is correct)
    - tsconfig.ngc.json (ensure the new package is added + the path is correct)
    - package.json 
        - Add  "libs:packages:<name>:build" script
        - Add above script to "build:libs:packages" - remember to put it after packages it is dependent on, and before other packages depending on it.