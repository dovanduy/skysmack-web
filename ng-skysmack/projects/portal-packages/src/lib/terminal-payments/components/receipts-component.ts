import { ReceiptsIndexComponent } from './receipts-index/receipts-index.component';
import { ReceiptsCreateComponent } from './receipts-create/receipts-create.component';
import { ReceiptsEditComponent } from './receipts-edit/receipts-edit.component';
import { Routes } from '@angular/router';

export const receiptsRoutes: Routes = [
    {
        path: 'types', component: ReceiptsIndexComponent, children: [
            { path: 'edit/:id', component: ReceiptsEditComponent, pathMatch: 'full' },
            { path: 'create', component: ReceiptsCreateComponent, pathMatch: 'full' },
        ]
    }
    // {
    //     path: 'types/fields', component: ReceiptsFieldsIndexComponent, children: [
    //         { path: 'create', component: ReceiptsFieldsCreateComponent, pathMatch: 'full' },
    //         { path: 'edit/:key', component: ReceiptsFieldsEditComponent, pathMatch: 'full' }
    //     ]
    // },
];

export const receiptsComponents: any[] = [
    ReceiptsIndexComponent,
    ReceiptsEditComponent,
    ReceiptsCreateComponent,
    // ReceiptsFieldsIndexComponent,
    // ReceiptsFieldsCreateComponent,
    // ReceiptsFieldsEditComponent,
];
