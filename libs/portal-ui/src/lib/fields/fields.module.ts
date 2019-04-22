import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule } from './../portal-ui.module';
import { LanguageService } from './../language/language.service';
import { fieldsComponents } from './components/fields-components';


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
    LanguageService
  ]
})
export class FieldsModule {
  constructor() { }
}
