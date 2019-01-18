import { ProductTypesIndexComponent } from './product-types-index/product-types-index.component';
import { ProductTypesCreateComponent } from './product-types-create/product-types-create.component';
import { ProductTypesEditComponent } from './product-types-edit/product-types-edit.component';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent, DynamicFieldsEditComponent } from '@skysmack/portal-ui';
import { Routes } from '@angular/router';
import { DynamicFieldRouteData } from '@skysmack/framework';

const data = {
    actionToken: 'NgProductTypesActions',
    storeToken: 'NgProductTypesStore'
} as DynamicFieldRouteData;

export const productTypesRoutes: Routes = [
    {
        path: 'types', component: ProductTypesIndexComponent, children: [
            { path: 'edit/:id', component: ProductTypesEditComponent, pathMatch: 'full' },
            { path: 'create', component: ProductTypesCreateComponent, pathMatch: 'full' },
        ]
    },
    {
        path: 'types/fields', component: DynamicFieldsIndexComponent, data, children: [
            { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full', data },
            { path: 'edit/:id', component: DynamicFieldsEditComponent, pathMatch: 'full', data }
        ]
    }
];

export const productTypesComponents: any[] = [
    ProductTypesIndexComponent,
    ProductTypesEditComponent,
    ProductTypesCreateComponent,
];
