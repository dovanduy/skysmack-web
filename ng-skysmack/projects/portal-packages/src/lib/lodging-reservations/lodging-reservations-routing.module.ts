import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { lodgingReservationsRoutes } from './components/lodgings-reservations-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...lodgingReservationsRoutes,
  ])],
  exports: [RouterModule]
})
export class LodgingReservationsRoutingModule { }