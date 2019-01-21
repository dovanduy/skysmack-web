import { ReceiptsIndexComponent } from './receipts-index/receipts-index.component';
import { ReceiptsCreateComponent } from './receipts-create/receipts-create.component';
import { ReceiptsEditComponent } from './receipts-edit/receipts-edit.component';
import { DynamicFieldsIndexComponent, DynamicFieldsCreateComponent } from '@skysmack/portal-ui';
import { DynamicFieldRouteData } from '@skysmack/framework';
import { Routes } from '@angular/router';

const data = {
  actionToken: 'NgReceiptsActions',
  storeToken: 'NgReceiptsStore'
} as DynamicFieldRouteData;

export const receiptsRoutes: Routes = [
    {
        path: 'receipts', component: ReceiptsIndexComponent, children: [
            { path: 'edit/:id', component: ReceiptsEditComponent, pathMatch: 'full' },
            { path: 'create', component: ReceiptsCreateComponent, pathMatch: 'full' },
        ]
    },
    {
      path: 'receipts/fields', component: DynamicFieldsIndexComponent, data, children: [
        { path: 'create', component: DynamicFieldsCreateComponent, pathMatch: 'full', data }
      ]
    }
];

export const receiptsComponents: any[] = [
    ReceiptsIndexComponent,
    ReceiptsEditComponent,
    ReceiptsCreateComponent
];
