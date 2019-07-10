import { ReceiptsIndexComponent } from './receipts-index/receipts-index.component';
import { ReceiptsCreateComponent } from './receipts-create/receipts-create.component';
import { ReceiptsEditComponent } from './receipts-edit/receipts-edit.component';
import { Routes } from '@angular/router';
import { RECEIPTS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { FieldsIndexComponent, FieldsCreateComponent } from '@skysmack/portal-fields';

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
