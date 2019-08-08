module.exports = {
  name: 'commercial-tenants',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-packages/commercial-tenants',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
