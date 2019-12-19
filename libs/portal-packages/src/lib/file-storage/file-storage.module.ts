import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileStorageRoutingModule } from './file-storage-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgFileStorageModule } from '@skysmack/ng-file-storage';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { fileStorageComponents, fileStorageEntryComponents } from './file-storage/components/file-storage-components';

import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver, NgDashboardProviders } from '@skysmack/ng-framework';
import { NgFileStorageDashboardProvider } from './ng-file-storage-dashboard-provider';
import { NgFileStorageMenuProvider } from './ng-file-storage-menu-provider';
import { fieldcomponents } from './file-storage/fields/field-components';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { MatListModule } from '@angular/material/list';
import { FileNamePipe } from './file-storage/components/file-storage-index/file-name.pipe';

const material = [
  MatListModule
];

const pipes = [
  FileNamePipe
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    PortalUiModule,
    NgFileStorageModule,
    DynamicFormsModule,
    FileStorageRoutingModule,
    PortalFieldsModule,
    ...material
  ],
  exports: [],
  declarations: [
    ...fileStorageComponents,
    ...fieldcomponents,
    ...pipes
  ],
  entryComponents: [
    ...fileStorageEntryComponents,
    ...fieldcomponents
  ],
  providers: []
})
export class FileStorageModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    dashboardProviders: NgDashboardProviders,
    fileStorageDashboardProvider: NgFileStorageDashboardProvider,
    ngMenuProviders: NgMenuProviders,
    ngFileStorageMenuProvider: NgFileStorageMenuProvider
  ) {
    coalescingResolver.registerResolver(localResolver);
    dashboardProviders.add(fileStorageDashboardProvider);
    ngMenuProviders
      .add(ngFileStorageMenuProvider);
  }
}
