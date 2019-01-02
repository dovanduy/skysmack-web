
import { Routes } from '@angular/router';
import { PackagesIndexComponent } from './packages-index/packages-index.component';
import { PackagesCreateComponent } from './packages-create/packages-create.component';
import { PackagesEditComponent } from './packages-edit/packages-edit.component';

export const packagesRoutes: Routes = [
  {
    path: '', component: PackagesIndexComponent,
    children: [
      { path: 'create', component: PackagesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: PackagesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const packagesComponents: any[] = [
  PackagesIndexComponent,
  PackagesCreateComponent,
  PackagesEditComponent,
];