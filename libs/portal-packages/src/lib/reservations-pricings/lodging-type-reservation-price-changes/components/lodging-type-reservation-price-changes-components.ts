import { Routes } from '@angular/router';
import { LodgingTypeReservationPriceChangesIndexComponent } from './lodging-type-reservation-price-changes-index/lodging-type-reservation-price-changes-index.component';
import { LodgingTypeReservationPriceChangesCreateComponent } from './lodging-type-reservation-price-changes-create/lodging-type-reservation-price-changes-create.component';
import { LodgingTypeReservationPriceChangesEditComponent } from './lodging-type-reservation-price-changes-edit/lodging-type-reservation-price-changes-edit.component';

export const lodgingTypeReservationPriceChangesRoutes: Routes = [
  {
    path: 'types/reservation-price-changes', component: LodgingTypeReservationPriceChangesIndexComponent,
    children: [
      { path: 'create', component: LodgingTypeReservationPriceChangesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingTypeReservationPriceChangesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const lodgingTypeReservationPriceChangesComponents: any[] = [
  LodgingTypeReservationPriceChangesIndexComponent,
  LodgingTypeReservationPriceChangesCreateComponent,
  LodgingTypeReservationPriceChangesEditComponent
];
