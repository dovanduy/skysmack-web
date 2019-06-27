import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { lodgingReservationsRoutes } from './lodging-reservations/lodgings-reservations-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...lodgingReservationsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class LodgingReservationsRoutingModule { }
