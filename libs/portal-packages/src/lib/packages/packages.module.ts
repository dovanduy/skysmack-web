import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesRoutingModule } from './packages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { packagesComponents } from './components/packages-components';

import { NgPackagesModule } from '@skysmack/ng-packages';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { NgPackagesMenuProvider } from './ng-packages-menu-provider';
import { PortalFieldsModule } from '@skysmack/portal-fields';

/**
 * To activate available packages overview, incomment the code in the following places
 * packages.module.ts (here)
 * packages-components.ts
 * available-packages-overview.component.ts
 * components/index
 */

// INCOMMENT TO ACTIVATE PACKAGE OVERVIEW
// import { NgxGraphModule } from '@swimlane/ngx-graph';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    PortalFieldsModule,
    PackagesRoutingModule,
    NgPackagesModule,
    // INCOMMENT TO ACTIVATE PACKAGE OVERVIEW
    // NgxGraphModule,
    // NgxChartsModule
  ],
  exports: [],
  declarations: [
    ...packagesComponents
  ],
  providers: []
})
export class PackagesModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngPackagesMenuProvider: NgPackagesMenuProvider,
  ) {
    ngMenuProviders
      .add(ngPackagesMenuProvider)
  }
}
