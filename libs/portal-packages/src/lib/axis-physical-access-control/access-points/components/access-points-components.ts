import { Routes } from '@angular/router';
import { AccessPointsIndexComponent } from './access-points-index/access-points-index.component';
import { AccessPointsCreateComponent } from './access-points-create/access-points-create.component';

export const accessPointsRoutes: Routes = [
  {
    path: 'access-points', component: AccessPointsIndexComponent,
    children: [
      { path: 'create', component: AccessPointsCreateComponent, pathMatch: 'full' }
    ]
  }
];

export const accessPointsComponents: any[] = [
  AccessPointsIndexComponent,
  AccessPointsCreateComponent
];

export const accessPointsEntryComponents = [
];
