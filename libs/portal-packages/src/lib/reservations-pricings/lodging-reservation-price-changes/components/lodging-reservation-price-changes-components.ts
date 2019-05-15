import { Routes } from '@angular/router';
import { LodgingReservationPriceChangesIndexComponent } from './lodging-reservation-price-changes-index/lodging-reservation-price-changes-index.component';
import { LodgingReservationPriceChangesCreateComponent } from './lodging-reservation-price-changes-create/lodging-reservation-price-changes-create.component';
import { LodgingReservationPriceChangesEditComponent } from './lodging-reservation-price-changes-edit/lodging-reservation-price-changes-edit.component';

export const lodgingReservationPriceChangesRoutes: Routes = [
  {
    path: 'reservation-price-changes', component: LodgingReservationPriceChangesIndexComponent,
    children: [
      { path: 'create', component: LodgingReservationPriceChangesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingReservationPriceChangesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const lodgingReservationPriceChangesComponents: any[] = [
  LodgingReservationPriceChangesIndexComponent,
  LodgingReservationPriceChangesCreateComponent,
  LodgingReservationPriceChangesEditComponent
];
