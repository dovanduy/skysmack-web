import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { personsRoutes } from './persons/components/persons-components';

@NgModule({
  imports: [RouterModule.forChild(personsRoutes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
