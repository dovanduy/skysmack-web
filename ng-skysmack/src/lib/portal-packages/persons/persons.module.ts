import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgPersonsModule } from './../../ng-packages/persons';
import { PortalUiModule } from 'lib/portal-ui/portal-ui.module';
import { personsComponents } from './components/persons-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PersonsRoutingModule,
    NgPersonsModule,
    PortalUiModule
  ],
  exports: [],
  declarations: [
    ...personsComponents
  ],
  providers: []
})
export class PersonsModule { }
