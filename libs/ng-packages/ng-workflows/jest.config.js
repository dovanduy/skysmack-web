module.exports = {
  name: 'ng-workflows',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-packages/ng-workflows',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
