import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { personsRoutes } from './components/persons-components';

@NgModule({
  imports: [RouterModule.forChild(personsRoutes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
