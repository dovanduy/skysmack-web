module.exports = {
  name: 'ng-skysmack',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-skysmack',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
