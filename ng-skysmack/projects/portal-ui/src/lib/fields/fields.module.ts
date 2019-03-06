import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PortalUiModule } from './../portal-ui.module';
import { TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from './../language/language.service';
import { fieldsComponents } from './components/fields-components';
import { HttpLoaderFactory } from './../portal-ui.helper';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule
  ],
  declarations: [
    ...fieldsComponents
  ],
  exports: [
    ...fieldsComponents
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
export class FieldsModule {
  constructor(public languageService: LanguageService) { }
}
