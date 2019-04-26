import { Routes } from '@angular/router';
import { LodgingAllocatedPricesIndexComponent } from './lodging-allocated-prices-index/lodging-allocated-prices-index.component';
import { LodgingAllocatedPricesCreateComponent } from './lodging-allocated-prices-create/lodging-allocated-prices-create.component';
import { LodgingAllocatedPricesEditComponent } from './lodging-allocated-prices-edit/lodging-allocated-prices-edit.component';

export const lodgingAllocatedPricesRoutes: Routes = [
  {
    path: 'allocated-prices', component: LodgingAllocatedPricesIndexComponent,
    children: [
      { path: 'create', component: LodgingAllocatedPricesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingAllocatedPricesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const lodgingAllocatedPricesComponents: any[] = [
  LodgingAllocatedPricesIndexComponent,
  LodgingAllocatedPricesCreateComponent,
  LodgingAllocatedPricesEditComponent
];
