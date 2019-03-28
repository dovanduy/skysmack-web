import { Routes } from '@angular/router';
import { ProductTypePriceChangesIndexComponent } from './product-type-price-changes-index/product-type-price-changes-index.component';
import { ProductTypePriceChangesCreateComponent } from './product-type-price-changes-create/product-type-price-changes-create.component';
import { ProductTypePriceChangesEditComponent } from './product-type-price-changes-edit/product-type-price-changes-edit.component';

export const productTypePriceChangesRoutes: Routes = [
  {
    path: 'types/price-changes', component: ProductTypePriceChangesIndexComponent,
    children: [
      { path: 'create', component: ProductTypePriceChangesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: ProductTypePriceChangesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const productTypePriceChangesComponents: any[] = [
  ProductTypePriceChangesIndexComponent,
  ProductTypePriceChangesCreateComponent,
  ProductTypePriceChangesEditComponent
];
