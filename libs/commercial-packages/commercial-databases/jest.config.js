module.exports = {
  name: 'commercial-databases',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-packages/commercial-databases',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
