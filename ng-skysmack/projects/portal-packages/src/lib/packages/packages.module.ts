import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PortalUiModule, HttpLoaderFactory } from '@skysmack/portal-ui';
import { packagesComponents } from './components/packages-components';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';
import { NgPackagesModule } from '@skysmack/ng-packages';

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
    LanguageService,
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ]
})
export class PackagesModule {
  constructor(public languageService: LanguageService) { }
}
