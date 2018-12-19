import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFieldsRoutingModule } from './dynamic-fields-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PortalUiModule, HttpLoaderFactory } from 'lib/portal-ui/portal-ui.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'lib/portal-ui/language/language.service';
import { dynamicFieldsComponents } from './components/dynamic-fields-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFieldsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
    ...dynamicFieldsComponents
  ],
  providers: []
})
export class DynamicFieldsModule {
  constructor(
    public languageService: LanguageService,
    public translateService: TranslateService
  ) {
    this.languageService.settingsRedux.getSettings().subscribe(settings => this.translateService.use(settings.language));
  }
}
