import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { lodgingReservationsRoutes } from './lodging-reservations/lodgings-reservations-components';
import { groupReservationsRoutes } from './group-reservations/components/group-reservations-component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...lodgingReservationsRoutes,
        ...groupReservationsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class LodgingReservationsRoutingModule { }
