
import { Routes } from '@angular/router';
import { PackagesIndexComponent } from './packages-index/packages-index.component';
import { PackagesCreateComponent } from './packages-create/packages-create.component';
import { PackagesEditComponent } from './packages-edit/packages-edit.component';
// INCOMMENT TO ACTIVATE PACKAGE OVERVIEW
// import { AvailablePackagesOverviewComponent } from './available-packages-overview/available-packages-overview.component';

export const packagesRoutes: Routes = [
  {
    path: '', component: PackagesIndexComponent,
    children: [
      { path: 'create', component: PackagesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: PackagesEditComponent, pathMatch: 'full' }
    ]
  },
  // INCOMMENT TO ACTIVATE PACKAGE OVERVIEW
  // { path: 'available_packages', component: AvailablePackagesOverviewComponent, pathMatch: 'full' }
];

export const packagesComponents: any[] = [
  PackagesIndexComponent,
  PackagesCreateComponent,
  PackagesEditComponent,
  // INCOMMENT TO ACTIVATE PACKAGE OVERVIEW
  // AvailablePackagesOverviewComponent
];
