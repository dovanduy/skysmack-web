import { ReceiptsIndexComponent } from './receipts-index/receipts-index.component';
import { ReceiptsCreateComponent } from './receipts-create/receipts-create.component';
import { ReceiptsEditComponent } from './receipts-edit/receipts-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent } from '@skysmack/portal-ui';
import { Routes } from '@angular/router';

export const receiptsRoutes: Routes = [
  {
    path: 'receipts', component: ReceiptsIndexComponent, children: [
      { path: 'edit/:id', component: ReceiptsEditComponent, pathMatch: 'full' },
      { path: 'create', component: ReceiptsCreateComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'receipts/fields', component: FieldsIndexComponent, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' }
    ]
  }
];

export const receiptsComponents: any[] = [
  ReceiptsIndexComponent,
  ReceiptsEditComponent,
  ReceiptsCreateComponent
];
