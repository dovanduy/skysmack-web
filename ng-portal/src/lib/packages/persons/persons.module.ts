import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsIndexComponent } from './components/persons-index/persons-index.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    PersonsRoutingModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [],
  declarations: [PersonsIndexComponent]
})
export class PersonsModule { }
