import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsIndexComponent } from './components/persons-index/persons-index.component';

@NgModule({
  imports: [
    CommonModule,
    PersonsRoutingModule
  ],
  exports: [],
  declarations: [PersonsIndexComponent]
})
export class PersonsModule { }
