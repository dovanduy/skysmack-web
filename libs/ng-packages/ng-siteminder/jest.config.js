module.exports = {
  name: 'ng-siteminder',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-packages/ng-siteminder',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
