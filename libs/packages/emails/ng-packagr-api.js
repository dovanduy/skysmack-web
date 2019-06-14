const ngPackage = require('../../../node_modules/ng-packagr');
const path = require('path');

ngPackage
  .ngPackagr()
  .forProject(path.join(__dirname, 'ng-package-config.js'))
  .withTsConfig(path.join(__dirname, 'tsconfig.ngc.json'))
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
