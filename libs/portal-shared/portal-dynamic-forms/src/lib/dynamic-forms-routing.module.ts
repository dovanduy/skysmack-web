import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      // path: '', component: DefaultComponent, children: [ <-- currently in portal-ui
      //...routes
      // ]
    }
  ])],
  exports: [RouterModule]
})
export class DynamicFormsRoutingModule { }
