import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsIndexComponent } from './components/persons-index/persons-index.component';
import { HttpClientModule } from '@angular/common/http';
import { NgPersonsModule } from './../../ng-packages/persons';
import { PortalUiModule } from 'lib/portal-ui/portal-ui.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PersonsRoutingModule,
    NgPersonsModule,
    PortalUiModule
  ],
  exports: [],
  declarations: [PersonsIndexComponent],
  providers: [],
})
export class PersonsModule { }
