module.exports = {
  name: 'ng-fields',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-fields',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
