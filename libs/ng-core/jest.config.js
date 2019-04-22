module.exports = {
  name: 'ng-core',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ng-core',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
