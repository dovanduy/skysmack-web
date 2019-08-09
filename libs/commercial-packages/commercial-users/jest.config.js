module.exports = {
  name: 'commercial-users',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-packages/commercial-users',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
