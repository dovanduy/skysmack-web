module.exports = {
  name: 'ng-cors',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-packages/ng-cors',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
