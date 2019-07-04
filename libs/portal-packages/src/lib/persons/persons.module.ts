import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgPersonsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { personsComponents } from './persons/components/persons-components';
import { LanguageService } from '@skysmack/portal-ui';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgDynamicFormsModule,
    PersonsRoutingModule,
    NgPersonsModule,
    FieldsModule
  ],
  declarations: [
    ...personsComponents
  ],
  providers: [
    LanguageService
  ]
})
export class PersonsModule {
  constructor() { }
}
