import { Routes } from '@angular/router';
import { AssignmentsSchedulesCreateComponent } from './assignments-schedules-create/assignments-schedules-create.component';
import { AssignmentsSchedulesEditComponent } from './assignments-schedules-edit/assignments-schedules-edit.component';
import { AssignmentsSchedulesIndexComponent } from './assignments-schedules-index/assignments-schedules-index.component';


export const assignmentsSchedulesRoutes: Routes = [
  {
    path: 'assignments/schedules', component: AssignmentsSchedulesIndexComponent,
    children: [
      { path: 'create', component: AssignmentsSchedulesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: AssignmentsSchedulesEditComponent, pathMatch: 'full' }
    ]
  },
];

export const assignmentsSchedulesComponents: any[] = [
  AssignmentsSchedulesIndexComponent,
  AssignmentsSchedulesCreateComponent,
  AssignmentsSchedulesEditComponent
];
