import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { lodgingReservationsRoutes } from './lodging-reservations/lodgings-reservations-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...lodgingReservationsRoutes,
  ])],
  exports: [RouterModule]
})
export class LodgingReservationsRoutingModule { }
