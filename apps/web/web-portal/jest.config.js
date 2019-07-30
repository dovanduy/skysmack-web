module.exports = {
  name: 'web-portal',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/web/web-portal/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
