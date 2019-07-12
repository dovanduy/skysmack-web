module.exports = {
  name: 'portal-settings',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/portal-settings',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
