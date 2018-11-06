import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonsIndexComponent } from './components/persons-index/persons-index.component';

const routes: Routes = [
  {
    path: '', component: PersonsIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
