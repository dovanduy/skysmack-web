import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingsRoutingModule } from './lodgings-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgLodgingsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, DynamicFieldsModule } from '@skysmack/portal-ui';
import { lodgingsComponents } from './components/lodgings-components';
import { lodgingTypesComponents } from './components/lodging-types-component';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgLodgingsModule,
    PortalUiModule,
    LodgingsRoutingModule,
    DynamicFieldsModule
  ],
  exports: [],
  declarations: [
    ...lodgingsComponents,
    ...lodgingTypesComponents
  ],
  providers: [{
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }]
})
export class LodgingsModule {
  constructor(
    public languageService: LanguageService,
    public translateService: TranslateService
  ) {
    this.languageService.settingsRedux.getSettings().subscribe(settings => this.translateService.use(settings.language));
  }
}
