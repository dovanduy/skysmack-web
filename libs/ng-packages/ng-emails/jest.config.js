module.exports = {
  name: 'ng-emails',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-packages/ng-emails',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
