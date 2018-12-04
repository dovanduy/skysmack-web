import { Routes } from '@angular/router';
import { LodgingTypesIndexComponent } from './lodging-types-index/lodging-types-index.component';
import { LodgingTypesEditComponent } from './lodging-types-edit/lodging-types-edit.component';
import { LodgingTypesCreateComponent } from './lodging-types-create/lodging-types-create.component';

export const lodgingTypesRoutes: Routes = [
    {
        path: 'types', component: LodgingTypesIndexComponent, children: [
            { path: 'edit/:id', component: LodgingTypesEditComponent, pathMatch: 'full' },
            { path: 'create', component: LodgingTypesCreateComponent, pathMatch: 'full' },
        ]
    }
    // {
    //     path: 'types/fields', component: LodgingTypesFieldsIndexComponent, children: [
    //         { path: 'create', component: LodgingTypesFieldsCreateComponent, pathMatch: 'full' },
    //         { path: 'edit/:key', component: LodgingTypesFieldsEditComponent, pathMatch: 'full' }
    //     ]
    // }
];

export const lodgingTypesComponents: any[] = [
    LodgingTypesIndexComponent,
    LodgingTypesEditComponent,
    LodgingTypesCreateComponent
];
