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
import { LodgingTypeSelectFieldComponent } from './lodging-type-select-field/lodging-type-select-field.component';
import { LodgingTypeSelectDialogComponent } from './lodging-type-select-dialog/lodging-type-select-dialog.component';
import { LodgingSelectFieldComponent } from './lodging-select-field/lodging-select-field.component';
import { LodgingSelectDialogComponent } from './lodging-select-dialog/lodging-select-dialog.component';
import { getFieldsRoutes } from '@skysmack/portal-fields';
import { LODGING_RESERVATIONS_AREA_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS } from '@skysmack/packages-lodging-reservations';

export const lodgingReservationsRoutes: Routes = [
    {
        path: '', children: [
            {
                path: '', component: LodgingsReservationsIndexComponent, children: [
                    { path: 'create', component: LodgingsReservationsCreateComponent, pathMatch: 'full' },
                    { path: 'edit/:id', component: LodgingsReservationsEditComponent, pathMatch: 'full' },
                    {
                        path: 'settings/checkin', component: SettingsComponent, pathMatch: 'full', data: {
                            fieldsConfigToken: 'NgLodgingReservationsSettingsFieldsConfig'
                        } as RouteData
                    },
                ]
            },
            getFieldsRoutes(LODGING_RESERVATIONS_AREA_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS)
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
    LodgingTypeSelectFieldComponent,
    LodgingTypeSelectDialogComponent,
    LodgingSelectFieldComponent,
    LodgingSelectDialogComponent
];

export const lodgingReservationsEntryComponents: any[] = [
    LodgingReservationsDashboardComponent,
    LodgingTypeSelectFieldComponent,
    LodgingTypeSelectDialogComponent,
    LodgingSelectFieldComponent,
    LodgingSelectDialogComponent
];
