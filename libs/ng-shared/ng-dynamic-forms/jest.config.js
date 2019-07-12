module.exports = {
  name: 'ng-dynamic-forms',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-dynamic-forms',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
