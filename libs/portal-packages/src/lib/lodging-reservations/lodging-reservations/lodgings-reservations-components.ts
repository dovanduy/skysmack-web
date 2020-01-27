import { Routes } from '@angular/router';
import { LodgingsStaysComponent } from '../components/lodgings-stays/lodgings-stays.component';
import { LodgingsArrivalsComponent } from '../components/lodgings-arrivals/lodgings-arrivals.component';
import { LodgingsDeparturesComponent } from '../components/lodgings-departures/lodgings-departures.component';
import { LodgingsReservationsIndexComponent } from './lodgings-reservations-index/lodgings-reservations-index.component';
import { LodgingsReservationsCreateComponent } from './lodgings-reservations-create/lodgings-reservations-create.component';
import { LodgingsReservationsEditComponent } from './lodgings-reservations-edit/lodgings-reservations-edit.component';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';
import { ArrivalsDashboardComponent } from './arrivals-dashboard/arrivals-dashboard.component';
import { LodgingTypeSelectFieldComponent } from './lodging-type-select-field/lodging-type-select-field.component';
import { LodgingTypeSelectDialogComponent } from './lodging-type-select-dialog/lodging-type-select-dialog.component';
import { LodgingSelectFieldComponent } from './lodging-select-field/lodging-select-field.component';
import { LodgingSelectDialogComponent } from './lodging-select-dialog/lodging-select-dialog.component';
import { getFieldsRoutes } from '@skysmack/portal-fields';
import { LODGING_RESERVATIONS_AREA_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS } from '@skysmack/packages-lodging-reservations';
import { DeparturesDashboardComponent } from './departures-dashboard/departures-dashboard.component';
import { InStayDashboardComponent } from './in-stay-dashboard/in-stay-dashboard.component';
import { CheckinFormComponent } from './checkin-form/checkin-form.component';
import { MoveFormComponent } from './move-form/move-form.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { ConfirmReservationDialogComponent } from './confirm-reservation-dialog/confirm-reservation-dialog.component';
import { LodgingsReservationsDetailsComponent } from './lodgings-reservations-details/lodgings-reservations-details.component';

const lodgingReservationChildrenRoutes = [
    { path: 'create', component: LodgingsReservationsCreateComponent, pathMatch: 'full' },
    { path: 'edit/:id', component: LodgingsReservationsEditComponent, pathMatch: 'full' },
    {
        path: 'settings/checkin', component: SettingsComponent, pathMatch: 'full', data: {
            fieldsConfigToken: 'NgLodgingReservationsSettingsFieldsConfig'
        } as RouteData
    },
];

export const lodgingReservationsRoutes: Routes = [
    {
        path: '', children: [
            {
                path: 'details/:id', component: LodgingsReservationsDetailsComponent, pathMatch: 'full'
            },
            {
                path: '', component: LodgingsReservationsIndexComponent, children: lodgingReservationChildrenRoutes
            },
            getFieldsRoutes(LODGING_RESERVATIONS_AREA_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS)
        ]
    },
    { path: 'stays', component: LodgingsStaysComponent, children: lodgingReservationChildrenRoutes },
    { path: 'arrivals', component: LodgingsArrivalsComponent, children: lodgingReservationChildrenRoutes },
    { path: 'departures', component: LodgingsDeparturesComponent, children: lodgingReservationChildrenRoutes }
];

export const lodgingReservationsComponents: any[] = [
    LodgingsReservationsIndexComponent,
    LodgingsReservationsCreateComponent,
    LodgingsReservationsEditComponent,
    LodgingsStaysComponent,
    LodgingsArrivalsComponent,
    LodgingsDeparturesComponent,
    LodgingsReservationsDetailsComponent,
    ArrivalsDashboardComponent,
    InStayDashboardComponent,
    DeparturesDashboardComponent,
    LodgingTypeSelectFieldComponent,
    LodgingTypeSelectDialogComponent,
    LodgingSelectFieldComponent,
    LodgingSelectDialogComponent,
    CheckinFormComponent,
    MoveFormComponent,
    CheckoutFormComponent,
    ConfirmReservationDialogComponent
];

export const lodgingReservationsEntryComponents: any[] = [
    ArrivalsDashboardComponent,
    InStayDashboardComponent,
    DeparturesDashboardComponent,
    LodgingTypeSelectFieldComponent,
    LodgingTypeSelectDialogComponent,
    LodgingSelectFieldComponent,
    LodgingSelectDialogComponent,
    CheckinFormComponent,
    MoveFormComponent,
    CheckoutFormComponent,
    ConfirmReservationDialogComponent,
    LodgingsReservationsDetailsComponent
];
