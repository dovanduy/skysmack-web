import { Routes } from '@angular/router';
import { LodgingTypesIndexComponent } from './lodging-types-index/lodging-types-index.component';
import { LodgingTypesEditComponent } from './lodging-types-edit/lodging-types-edit.component';
import { LodgingTypesCreateComponent } from './lodging-types-create/lodging-types-create.component';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent, DynamicFieldsEditComponent } from '@skysmack/portal-ui';
import { DynamicFieldRouteData } from '@skysmack/framework';

const data = {
    actionToken: 'NgLodgingTypesActions',
    storeToken: 'NgLodgingTypesStore'
} as DynamicFieldRouteData;

export const lodgingTypesRoutes: Routes = [
    {
        path: 'types', component: LodgingTypesIndexComponent,
        children: [
            { path: 'edit/:id', component: LodgingTypesEditComponent, pathMatch: 'full' },
            { path: 'create', component: LodgingTypesCreateComponent, pathMatch: 'full' },
        ]
    },
    {
        path: 'types/fields', component: DynamicFieldsIndexComponent, data, children: [
            { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full', data },
            { path: 'edit/:id', component: DynamicFieldsEditComponent, pathMatch: 'full', data }
        ]
    }
];

export const lodgingTypesComponents: any[] = [
    LodgingTypesIndexComponent,
    LodgingTypesEditComponent,
    LodgingTypesCreateComponent
];
