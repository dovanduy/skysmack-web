import { Routes } from '@angular/router';
import { MaintenanceStatesCreateComponent } from './maintenance-states-create/maintenance-states-create.component';
import { MaintenanceStatesEditComponent } from './maintenance-states-edit/maintenance-states-edit.component';
import { MaintenanceStatesIndexComponent } from './maintenance-states-index/maintenance-states-index.component';


export const maintenanceStatesRoutes: Routes = [
  {
    path: 'assignments/maintenance-states', component: MaintenanceStatesIndexComponent,
    children: [
      { path: 'create', component: MaintenanceStatesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: MaintenanceStatesEditComponent, pathMatch: 'full' }
    ]
  },
];

export const maintenanceStatesComponents: any[] = [
  MaintenanceStatesIndexComponent,
  MaintenanceStatesCreateComponent,
  MaintenanceStatesEditComponent,
];
