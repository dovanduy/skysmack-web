module.exports = {
  name: 'ng-invoices-products',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ng-packages/ng-invoices-products',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
