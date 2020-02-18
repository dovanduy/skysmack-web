module.exports = {
  name: 'hotel-booking-example',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/example-apps/hotel-booking-example',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
