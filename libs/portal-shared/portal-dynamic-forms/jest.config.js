module.exports = {
  name: 'portal-dynamic-forms',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/portal-dynamic-forms',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
