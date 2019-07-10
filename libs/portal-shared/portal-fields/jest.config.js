module.exports = {
  name: 'portal-shared-portal-fields',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/portal-shared/portal-fields',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
