module.exports = {
  name: 'portal-ui',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/portal-ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
