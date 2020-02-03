import { Routes } from '@angular/router';
import { AccessControllersIndexComponent } from './access-controllers-index/access-controllers-index.component';
import { AccessControllersCreateComponent } from './access-controllers-create/access-controllers-create.component';

export const accessControllersRoutes: Routes = [
  {
    path: 'access-controllers', component: AccessControllersIndexComponent,
    children: [
      { path: 'create', component: AccessControllersCreateComponent, pathMatch: 'full' }
    ]
  }
];

export const accessControllersComponents: any[] = [
  AccessControllersIndexComponent,
  AccessControllersCreateComponent
];

export const accessControllersEntryComponents = [
];
