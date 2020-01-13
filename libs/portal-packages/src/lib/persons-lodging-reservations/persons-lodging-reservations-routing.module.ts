import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: DefaultComponent, children: [
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class PersonsLodgingReservationsRoutingModule { }
