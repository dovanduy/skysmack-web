import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgPersonsModule } from '@skysmack/ng-packages';
import { PortalUiModule } from '@skysmack/portal-ui';
import { personsComponents } from './persons/components/persons-components';
import { LanguageService } from '@skysmack/portal-ui';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgPersonsModule,
    DynamicFormsModule,
    PersonsRoutingModule,
    PortalFieldsModule
  ],
  exports: [],
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
