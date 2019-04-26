import { Routes } from '@angular/router';
import { LodgingTypePricesIndexComponent } from './lodging-type-prices-index/lodging-type-prices-index.component';
import { LodgingTypePricesCreateComponent } from './lodging-type-prices-create/lodging-type-prices-create.component';
import { LodgingTypePricesEditComponent } from './lodging-type-prices-edit/lodging-type-prices-edit.component';

export const lodgingTypePricesRoutes: Routes = [
  {
    path: 'types/prices', component: LodgingTypePricesIndexComponent,
    children: [
      { path: 'create', component: LodgingTypePricesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingTypePricesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const lodgingTypePricesComponents: any[] = [
  LodgingTypePricesIndexComponent,
  LodgingTypePricesCreateComponent,
  LodgingTypePricesEditComponent
];
