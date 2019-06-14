import { ProductTypesIndexComponent } from './product-types-index/product-types-index.component';
import { ProductTypesCreateComponent } from './product-types-create/product-types-create.component';
import { ProductTypesEditComponent } from './product-types-edit/product-types-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent, FieldsEditComponent } from '@skysmack/portal-ui';
import { Routes } from '@angular/router';
import { PRODUCT_TYPES_AREA_KEY } from '@skysmack/packages-products';

export const productTypesRoutes: Routes = [
    {
        path: 'types', component: ProductTypesIndexComponent, children: [
            { path: 'edit/:id', component: ProductTypesEditComponent, pathMatch: 'full' },
            { path: 'create', component: ProductTypesCreateComponent, pathMatch: 'full' },
        ]
    },
    {
        path: 'types/fields', component: FieldsIndexComponent, children: [
            { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' },
            { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full' }
        ], data: {
            areaKey: PRODUCT_TYPES_AREA_KEY
        }
    }
];

export const productTypesComponents: any[] = [
    ProductTypesIndexComponent,
    ProductTypesEditComponent,
    ProductTypesCreateComponent,
];
