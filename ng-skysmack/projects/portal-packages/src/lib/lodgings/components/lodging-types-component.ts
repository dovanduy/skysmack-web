import { Routes } from '@angular/router';
import { LodgingTypesIndexComponent } from './lodging-types-index/lodging-types-index.component';
import { LodgingTypesEditComponent } from './lodging-types-edit/lodging-types-edit.component';
import { LodgingTypesCreateComponent } from './lodging-types-create/lodging-types-create.component';
import { FieldsIndexComponent, FieldsCreateComponent, FieldsEditComponent } from '@skysmack/portal-ui';
import { LodgingTypesAvailablityComponent } from './lodging-types-availablity/lodging-types-availablity.component';

export const lodgingTypesRoutes: Routes = [
    {
        path: 'types', component: LodgingTypesIndexComponent,
        children: [
            { path: 'edit/:id', component: LodgingTypesEditComponent, pathMatch: 'full' },
            { path: 'create', component: LodgingTypesCreateComponent, pathMatch: 'full' },
        ]
    },
    {
        path: 'types/fields', component: FieldsIndexComponent, children: [
            { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' },
            { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full' }
        ]
    },
    { path: 'types/availability', component: LodgingTypesAvailablityComponent }
];

export const lodgingTypesComponents: any[] = [
    LodgingTypesIndexComponent,
    LodgingTypesEditComponent,
    LodgingTypesCreateComponent,
    LodgingTypesAvailablityComponent
];
