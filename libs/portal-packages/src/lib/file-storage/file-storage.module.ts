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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgFileStorageModule,
    DynamicFormsModule,
    FileStorageRoutingModule,
    PortalFieldsModule,
  ],
  exports: [],
  declarations: [
    ...fileStorageComponents
  ],
  entryComponents: [
    ...fileStorageEntryComponents
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
