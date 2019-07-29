module.exports = {
  name: 'web-web-commercial',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/web/web-commercial',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
