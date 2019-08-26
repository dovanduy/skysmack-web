import { Routes } from '@angular/router';
import { CommercialDatabasesIndexComponent } from './commercial-databases-index/commercial-databases-index.component';

export const commercialDatabasesRoutes: Routes = [
  {
    path: '', component: CommercialDatabasesIndexComponent,
  }
];

export const commercialDatabasesComponents: any[] = [
  CommercialDatabasesIndexComponent,
];
