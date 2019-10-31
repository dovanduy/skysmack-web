import { Routes } from '@angular/router';
import { PhoneLogsIndexComponent } from './phone-logs-index/phone-logs-index.component';
import { PhoneLogsCreateComponent } from './phone-logs-create/phone-logs-create.component';
import { PhoneLogsEditComponent } from './phone-logs-edit/phone-logs-edit.component';

export const phoneLogsRoutes: Routes = [
  {
    path: 'logs', component: PhoneLogsIndexComponent, children: [
      { path: 'create', component: PhoneLogsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: PhoneLogsEditComponent, pathMatch: 'full' },
    ],
  }
];

export const phoneLogsComponents: any[] = [
  PhoneLogsIndexComponent,
  PhoneLogsCreateComponent,
  PhoneLogsEditComponent
];
