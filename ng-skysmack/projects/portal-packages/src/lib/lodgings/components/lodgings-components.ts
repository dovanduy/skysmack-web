import { Routes } from '@angular/router';
import { LodgingsIndexComponent } from './lodgings-index/lodgings-index.component';
import { LodgingsCreateComponent } from './lodgings-create/lodgings-create.component';
import { LodgingsEditComponent } from './lodgings-edit/lodgings-edit.component';
import { DynamicFieldRouteData } from '@skysmack/framework';

export const lodgingsRoutes: Routes = [
  {
    path: '', component: LodgingsIndexComponent,
    children: [
      { path: 'create', component: LodgingsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields',
    loadChildren: './../../../../portal-ui/src/lib/dynamic-fields/dynamic-fields.module#DynamicFieldsModule',
    data: { actionToken: 'LodgingsActions', storeToken: 'LodgingsStore' } as DynamicFieldRouteData
  }
];

export const lodgingsComponents: any[] = [
  LodgingsIndexComponent,
  LodgingsCreateComponent,
  LodgingsEditComponent,
];
