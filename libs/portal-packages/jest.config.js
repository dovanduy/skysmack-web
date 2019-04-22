module.exports = {
  name: 'portal-packages',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/portal-packages',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
