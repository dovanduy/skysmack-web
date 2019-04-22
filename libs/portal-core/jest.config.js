module.exports = {
  name: 'portal-core',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/portal-core',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
