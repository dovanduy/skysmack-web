import { Routes } from '@angular/router';
import { LodgingPricesIndexComponent } from './lodging-prices-index/lodging-prices-index.component';
import { LodgingPricesCreateComponent } from './lodging-prices-create/lodging-prices-create.component';
import { LodgingPricesEditComponent } from './lodging-prices-edit/lodging-prices-edit.component';

export const lodgingPricesRoutes: Routes = [
  {
    path: 'prices', component: LodgingPricesIndexComponent,
    children: [
      { path: 'create', component: LodgingPricesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingPricesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const lodgingPricesComponents: any[] = [
  LodgingPricesIndexComponent,
  LodgingPricesCreateComponent,
  LodgingPricesEditComponent
];
