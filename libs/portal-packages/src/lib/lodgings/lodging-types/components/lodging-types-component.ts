import { Routes } from '@angular/router';
import { LodgingTypesIndexComponent } from './lodging-types-index/lodging-types-index.component';
import { LodgingTypesEditComponent } from './lodging-types-edit/lodging-types-edit.component';
import { LodgingTypesCreateComponent } from './lodging-types-create/lodging-types-create.component';
import { LodgingTypesAvailabilityComponent } from './lodging-types-availability/lodging-types-availability.component';
import { LODGING_TYPES_AREA_KEY, LODGING_TYPES_ADDITIONAL_PATHS } from '@skysmack/packages-lodgings';
import { getFieldsRoutes } from '@skysmack/portal-fields';

export const lodgingTypesRoutes: Routes = [
    {
        path: 'types', component: LodgingTypesIndexComponent,
        children: [
            { path: 'edit/:id', component: LodgingTypesEditComponent, pathMatch: 'full' },
            { path: 'create', component: LodgingTypesCreateComponent, pathMatch: 'full' },
        ]
    },
    getFieldsRoutes(LODGING_TYPES_AREA_KEY, LODGING_TYPES_ADDITIONAL_PATHS, ['types']),
    { path: 'types/availability', component: LodgingTypesAvailabilityComponent }
];

export const lodgingTypesComponents: any[] = [
    LodgingTypesIndexComponent,
    LodgingTypesEditComponent,
    LodgingTypesCreateComponent,
    LodgingTypesAvailabilityComponent
];
