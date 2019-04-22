module.exports = {
  name: 'ng-redux',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ng-redux',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
