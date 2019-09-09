import { Routes } from '@angular/router';
import { LodgingsStaysComponent } from '../components/lodgings-stays/lodgings-stays.component';
import { LodgingsArrivalsComponent } from '../components/lodgings-arrivals/lodgings-arrivals.component';
import { LodgingsDeparturesComponent } from '../components/lodgings-departures/lodgings-departures.component';
import { LodgingsReservationsIndexComponent } from './lodgings-reservations-index/lodgings-reservations-index.component';
import { LodgingsReservationsCreateComponent } from './lodgings-reservations-create/lodgings-reservations-create.component';
import { LodgingsReservationsEditComponent } from './lodgings-reservations-edit/lodgings-reservations-edit.component';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';
import { LodgingReservationsDashboardComponent } from './lodging-reservations-dashboard/lodging-reservations-dashboard.component';
import { LogdingTypeSelectFieldComponent } from './lodging-type-select-field/lodging-type-select-field.component';
import { LogdingTypeSelectDialogComponent } from './lodging-type-select-dialog/lodging-type-select-dialog.component';
import { LogdingSelectFieldComponent } from './lodging-select-field/lodging-type-select-field.component';
import { LogdingSelectDialogComponent } from './lodging-select-dialog/lodging-select-dialog.component';

export const lodgingReservationsRoutes: Routes = [
    {
        path: '', component: LodgingsReservationsIndexComponent, children: [
            { path: 'create', component: LodgingsReservationsCreateComponent, pathMatch: 'full' },
            { path: 'edit/:id', component: LodgingsReservationsEditComponent, pathMatch: 'full' },
            {
                path: 'settings/checkin', component: SettingsComponent, pathMatch: 'full', data: {
                    fieldsConfigToken: 'NgLodgingReservationsSettingsFieldsConfig'
                } as RouteData
            }
        ]
    },
    { path: 'stays', component: LodgingsStaysComponent },
    { path: 'arrivals', component: LodgingsArrivalsComponent },
    { path: 'departures', component: LodgingsDeparturesComponent }
];

export const lodgingReservationsComponents: any[] = [
    LodgingsReservationsIndexComponent,
    LodgingsReservationsCreateComponent,
    LodgingsReservationsEditComponent,
    LodgingsStaysComponent,
    LodgingsArrivalsComponent,
    LodgingsDeparturesComponent,
    LodgingReservationsDashboardComponent,
    LogdingTypeSelectFieldComponent,
    LogdingTypeSelectDialogComponent,
    LogdingSelectFieldComponent,
    LogdingSelectDialogComponent
];

export const lodgingReservationsEntryComponents: any[] = [
    LodgingReservationsDashboardComponent,
    LogdingTypeSelectFieldComponent,
    LogdingTypeSelectDialogComponent,
    LogdingSelectFieldComponent,
    LogdingSelectDialogComponent
];
