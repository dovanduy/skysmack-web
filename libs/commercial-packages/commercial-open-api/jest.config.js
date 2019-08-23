module.exports = {
  name: 'commercial-open-api',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-packages/commercial-open-api',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
