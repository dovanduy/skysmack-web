import { Routes } from '@angular/router';
import { LodgingsStaysComponent } from './lodgings-stays/lodgings-stays.component';
import { LodgingsArrivalsComponent } from './lodgings-arrivals/lodgings-arrivals.component';
import { LodgingsDeparturesComponent } from './lodgings-departures/lodgings-departures.component';
import { LodgingsReservationsIndexComponent } from './lodgings-reservations-index/lodgings-reservations-index.component';
import { LodgingsReservationsCreateComponent } from './lodgings-reservations-create/lodgings-reservations-create.component';
import { LodgingsReservationsEditComponent } from './lodgings-reservations-edit/lodgings-reservations-edit.component';
import { LodgingsAvailablityComponent } from './lodgings-availablity/lodgings-availablity.component';

export const lodgingReservationsRoutes: Routes = [
    {
        path: '', component: LodgingsReservationsIndexComponent, children: [
            { path: 'create', component: LodgingsReservationsCreateComponent, pathMatch: 'full' },
            { path: 'edit/:id', component: LodgingsReservationsEditComponent, pathMatch: 'full' },
        ]
    },
    { path: 'availability', component: LodgingsAvailablityComponent },
    { path: 'stays', component: LodgingsStaysComponent },
    { path: 'arrivals', component: LodgingsArrivalsComponent },
    { path: 'departures', component: LodgingsDeparturesComponent }
];

export const lodgingReservationsComponents: any[] = [
    LodgingsReservationsIndexComponent,
    LodgingsReservationsCreateComponent,
    LodgingsReservationsEditComponent,
    LodgingsAvailablityComponent,
    LodgingsStaysComponent,
    LodgingsArrivalsComponent,
    LodgingsDeparturesComponent
];
