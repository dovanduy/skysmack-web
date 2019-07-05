module.exports = {
  name: 'ng-settings',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-settings',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
