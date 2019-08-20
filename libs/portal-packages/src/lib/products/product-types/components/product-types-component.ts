import { ProductTypesIndexComponent } from './product-types-index/product-types-index.component';
import { ProductTypesCreateComponent } from './product-types-create/product-types-create.component';
import { ProductTypesEditComponent } from './product-types-edit/product-types-edit.component';
import { getFieldsRoutes } from '@skysmack/portal-fields';
import { Routes } from '@angular/router';
import { PRODUCT_TYPES_AREA_KEY, PRODUCT_TYPES_ADDITIONAL_PATHS } from '@skysmack/packages-products';

export const productTypesRoutes: Routes = [
    {
        path: 'types', component: ProductTypesIndexComponent, children: [
            { path: 'edit/:id', component: ProductTypesEditComponent, pathMatch: 'full' },
            { path: 'create', component: ProductTypesCreateComponent, pathMatch: 'full' },
        ]
    },
    getFieldsRoutes(PRODUCT_TYPES_AREA_KEY, PRODUCT_TYPES_ADDITIONAL_PATHS, ['types']),
];

export const productTypesComponents: any[] = [
    ProductTypesIndexComponent,
    ProductTypesEditComponent,
    ProductTypesCreateComponent,
];
