import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PortalUiModule } from './../portal-ui.module';
import { TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from './../language/language.service';
import { dynamicFieldsComponents } from './components/dynamic-fields-components';
import { HttpLoaderFactory } from './../portal-ui.helper';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule
  ],
  declarations: [
    ...dynamicFieldsComponents
  ],
  exports: [
    ...dynamicFieldsComponents
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
export class DynamicFieldsModule {
  constructor(public languageService: LanguageService) { }
}
