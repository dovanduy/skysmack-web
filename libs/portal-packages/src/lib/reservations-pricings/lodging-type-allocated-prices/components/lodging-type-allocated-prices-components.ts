import { Routes } from '@angular/router';
import { LodgingTypeAllocatedPricesIndexComponent } from './lodging-type-allocated-prices-index/lodging-type-allocated-prices-index.component';
import { LodgingTypeAllocatedPricesCreateComponent } from './lodging-type-allocated-prices-create/lodging-type-allocated-prices-create.component';
import { LodgingTypeAllocatedPricesEditComponent } from './lodging-type-allocated-prices-edit/lodging-type-allocated-prices-edit.component';

export const lodgingTypeAllocatedPricesRoutes: Routes = [
  {
    path: 'types/allocated-prices', component: LodgingTypeAllocatedPricesIndexComponent,
    children: [
      { path: 'create', component: LodgingTypeAllocatedPricesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingTypeAllocatedPricesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const lodgingTypeAllocatedPricesComponents: any[] = [
  LodgingTypeAllocatedPricesIndexComponent,
  LodgingTypeAllocatedPricesCreateComponent,
  LodgingTypeAllocatedPricesEditComponent
];
