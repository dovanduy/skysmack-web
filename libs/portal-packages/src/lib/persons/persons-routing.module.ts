import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { personsRoutes } from './persons/components/persons-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...personsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
