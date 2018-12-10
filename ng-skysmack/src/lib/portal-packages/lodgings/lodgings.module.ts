import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingsRoutingModule } from './lodgings-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgLodgingsModule } from './../../ng-packages/lodgings';
import { PortalUiModule, HttpLoaderFactory } from 'lib/portal-ui/portal-ui.module';
import { lodgingsComponents } from './components/lodgings-components';
import { lodgingTypesComponents } from './components/lodging-types-component';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from 'lib/portal-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LodgingsRoutingModule,
    NgLodgingsModule,
    PortalUiModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  exports: [],
  declarations: [
    ...lodgingsComponents,
    ...lodgingTypesComponents
  ],
  providers: [],
})
export class LodgingsModule {
  constructor(
    public languageService: LanguageService,
    public translateService: TranslateService
  ) {
    this.languageService.settingsRedux.getSettings().subscribe(settings => this.translateService.use(settings.language));
  }
}
