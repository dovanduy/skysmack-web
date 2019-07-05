import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule } from '@skysmack/portal-ui';
import { packagesComponents } from './components/packages-components';
import { LanguageService } from '@skysmack/portal-ui';
import { NgPackagesModule } from '@skysmack/ng-core';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';

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
  providers: [
    LanguageService
  ]
})
export class PackagesModule {
  constructor() { }
}
