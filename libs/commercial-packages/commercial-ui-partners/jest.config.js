module.exports = {
  name: 'commercial-ui-partners',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-packages/commercial-ui-partners',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
