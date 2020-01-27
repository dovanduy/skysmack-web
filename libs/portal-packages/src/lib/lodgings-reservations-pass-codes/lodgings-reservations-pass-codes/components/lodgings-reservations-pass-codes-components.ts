import { Routes } from '@angular/router';
import { LodgingsReservationsPassCodesIndexComponent } from './lodgings-reservations-pass-codes-index/lodgings-reservations-pass-codes-index.component';
import { LodgingsReservationsPassCodesCreateComponent } from './lodgings-reservations-pass-codes-create/lodgings-reservations-pass-codes-create.component';

export const lodgingsReservationsPassCodesRoutes: Routes = [
  {
    path: '', component: LodgingsReservationsPassCodesIndexComponent,
    children: [
      { path: 'create', component: LodgingsReservationsPassCodesCreateComponent, pathMatch: 'full' }
    ]
  }
];

export const lodgingsReservationsPassCodesComponents: any[] = [
  LodgingsReservationsPassCodesIndexComponent,
  LodgingsReservationsPassCodesCreateComponent
];

export const lodgingsReservationsPassCodesEntryComponents = [
];
