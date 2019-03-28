import { Routes } from '@angular/router';
import { ProductPriceChangesIndexComponent } from './product-price-changes-index/product-price-changes-index.component';
import { ProductPriceChangesCreateComponent } from './product-price-changes-create/product-price-changes-create.component';
import { ProductPriceChangesEditComponent } from './product-price-changes-edit/product-price-changes-edit.component';

export const productPriceChangesRoutes: Routes = [
  {
    path: 'price-changes', component: ProductPriceChangesIndexComponent,
    children: [
      { path: 'create', component: ProductPriceChangesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: ProductPriceChangesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const productPriceChangesComponents: any[] = [
  ProductPriceChangesIndexComponent,
  ProductPriceChangesCreateComponent,
  ProductPriceChangesEditComponent
];
