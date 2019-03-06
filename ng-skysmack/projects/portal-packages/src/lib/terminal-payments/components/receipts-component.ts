import { ReceiptsIndexComponent } from './receipts-index/receipts-index.component';
import { ReceiptsCreateComponent } from './receipts-create/receipts-create.component';
import { ReceiptsEditComponent } from './receipts-edit/receipts-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent } from '@skysmack/portal-ui';
import { FieldRouteData } from '@skysmack/framework';
import { Routes } from '@angular/router';

const data = {
  actionToken: 'NgReceiptsActions',
  storeToken: 'NgReceiptsStore'
} as FieldRouteData;

export const receiptsRoutes: Routes = [
    {
        path: 'receipts', component: ReceiptsIndexComponent, children: [
            { path: 'edit/:id', component: ReceiptsEditComponent, pathMatch: 'full' },
            { path: 'create', component: ReceiptsCreateComponent, pathMatch: 'full' },
        ]
    },
    {
      path: 'receipts/fields', component: FieldsIndexComponent, data, children: [
        { path: 'create', component: FieldsCreateComponent, pathMatch: 'full', data }
      ]
    }
];

export const receiptsComponents: any[] = [
    ReceiptsIndexComponent,
    ReceiptsEditComponent,
    ReceiptsCreateComponent
];
