import { Routes } from '@angular/router';
import { IdentitiesIndexComponent } from './identities-index/identities-index.component';

export const identitiesRoutes: Routes = [
  {
    path: '', component: IdentitiesIndexComponent
  }
];

export const identitiesComponents: any[] = [
  IdentitiesIndexComponent,
];
