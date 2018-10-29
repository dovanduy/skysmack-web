import { NgModule } from '@angular/core';
import { PersonsIndexComponent } from './persons/components/persons-index/persons-index.component';
import { PersonRoutingModule } from './person-routing.module';

@NgModule({
  imports: [
    PersonRoutingModule
  ],
  declarations: [PersonsIndexComponent],
  exports: [PersonRoutingModule]
})
export class PersonPackageModule { }
