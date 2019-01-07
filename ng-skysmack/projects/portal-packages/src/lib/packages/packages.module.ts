import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PortalUiModule, HttpLoaderFactory } from '@skysmack/portal-ui';
import { packagesComponents } from './components/packages-components';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';
import { NgPackagesModule } from '@skysmack/ng-packages';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    PackagesRoutingModule,
    NgPackagesModule
  ],
  exports: [],
  declarations: [
    ...packagesComponents
  ],
  providers: [{
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }]
})
export class PackagesModule {
  constructor(
    public languageService: LanguageService,
    public translateService: TranslateService
  ) {
    this.languageService.settingsRedux.getSettings().subscribe(settings => this.translateService.use(settings.language));
  }
}
