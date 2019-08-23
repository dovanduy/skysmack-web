import { Route } from '@angular/router';
import { FieldsIndexComponent } from '../management-components/fields-index/fields-index.component';
import { FieldsCreateComponent } from '../management-components/fields-create/fields-create.component';
import { FieldsEditComponent } from '../management-components/fields-edit/fields-edit.component';

export function getFieldsRoutes(areaKey: string, additionalPaths: string[]): Route {
    return {
        path: 'fields', component: FieldsIndexComponent, children: [
            { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' },
            { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full' }
        ], data: {
            areaKey,
            additionalPaths
        }
    };
};
