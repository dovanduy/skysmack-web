import { Routes } from '@angular/router';
import { CommercialAccountIndexComponent } from './commercial-account-index/commercial-account-index.component';

export const commercialAccountRoutes: Routes = [
  {
    path: '', component: CommercialAccountIndexComponent
  }
];

export const commercialAccountComponents: any[] = [
  CommercialAccountIndexComponent
];
