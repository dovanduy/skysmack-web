import { ProductTypesIndexComponent } from './product-types-index/product-types-index.component';
import { ProductTypesCreateComponent } from './product-types-create/product-types-create.component';
import { ProductTypesEditComponent } from './product-types-edit/product-types-edit.component';
import { Routes } from '@angular/router';

export const productTypesRoutes: Routes = [
    {
        path: 'types', component: ProductTypesIndexComponent, children: [
            { path: 'edit/:id', component: ProductTypesEditComponent, pathMatch: 'full' },
            { path: 'create', component: ProductTypesCreateComponent, pathMatch: 'full' },
        ]
    }
    // {
    //     path: 'types/fields', component: ProductTypesFieldsIndexComponent, children: [
    //         { path: 'create', component: ProductTypesFieldsCreateComponent, pathMatch: 'full' },
    //         { path: 'edit/:key', component: ProductTypesFieldsEditComponent, pathMatch: 'full' }
    //     ]
    // },
];

export const productTypesComponents: any[] = [
    ProductTypesIndexComponent,
    ProductTypesEditComponent,
    ProductTypesCreateComponent,
    // ProductTypesFieldsIndexComponent,
    // ProductTypesFieldsCreateComponent,
    // ProductTypesFieldsEditComponent,
];
