import { Routes } from '@angular/router';
import { AssignmentsIndexComponent } from './assignments-index/assignments-index.component';
import { AssignmentsCreateComponent } from './assignments-create/assignments-create.component';
import { AssignmentsEditComponent } from './assignments-edit/assignments-edit.component';
import { ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';

export const assignmentsRoutes: Routes = [
  {
    path: ASSIGNMENTS_AREA_KEY, component: AssignmentsIndexComponent,
    children: [
      { path: 'create', component: AssignmentsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: AssignmentsEditComponent, pathMatch: 'full' },
    ]
  },
];

export const assignmentsComponents: any[] = [
  AssignmentsIndexComponent,
  AssignmentsCreateComponent,
  AssignmentsEditComponent,
];
