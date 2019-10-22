import { GroupReservationsIndexComponent } from './group-reservations-index/group-reservations-index.component';
import { GroupReservationsCreateComponent } from './group-reservations-create/group-reservations-create.component';
import { GroupReservationsEditComponent } from './group-reservations-edit/group-reservations-edit.component';
import { getFieldsRoutes } from '@skysmack/portal-fields';
import { Routes } from '@angular/router';
import { GROUP_RESERVATIONS_AREA_KEY, GROUP_RESERVATIONS_ADDITIONAL_PATHS } from '@skysmack/packages-lodging-reservations';

export const groupReservationsRoutes: Routes = [
    {
        path: 'groups', children: [
            {
                path: '', component: GroupReservationsIndexComponent, children: [
                    { path: 'edit/:id', component: GroupReservationsEditComponent, pathMatch: 'full' },
                    { path: 'create', component: GroupReservationsCreateComponent, pathMatch: 'full' },
                ]
            },
            getFieldsRoutes(GROUP_RESERVATIONS_AREA_KEY, GROUP_RESERVATIONS_ADDITIONAL_PATHS)
        ]
    }
];

export const groupReservationsComponents: any[] = [
    GroupReservationsIndexComponent,
    GroupReservationsEditComponent,
    GroupReservationsCreateComponent,
];

export const groupReservationsEntryComponents: any[] = [
];
