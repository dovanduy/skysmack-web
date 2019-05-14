import { ReceiptsIndexComponent } from './receipts-index/receipts-index.component';
import { ReceiptsCreateComponent } from './receipts-create/receipts-create.component';
import { ReceiptsEditComponent } from './receipts-edit/receipts-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent } from '@skysmack/portal-ui';
import { Routes } from '@angular/router';
import { RECEIPTS_AREA_KEY } from '@skysmack/packages-terminal-payments';

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
    ], data: {
      areaKey: RECEIPTS_AREA_KEY
    }
  }
];

export const receiptsComponents: any[] = [
  ReceiptsIndexComponent,
  ReceiptsEditComponent,
  ReceiptsCreateComponent
];
