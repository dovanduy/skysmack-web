import { Routes } from '@angular/router';
import { SingleAssignmentsIndexComponent } from './single-assignments-index/single-assignments-index.component';
import { SingleAssignmentsCreateComponent } from './single-assignments-create/single-assignments-create.component';
import { SingleAssignmentsEditComponent } from './single-assignments-edit/single-assignments-edit.component';

export const singleAssignmentsRoutes: Routes = [
  {
    path: 'assignments', component: SingleAssignmentsIndexComponent,
    children: [
      { path: 'create', component: SingleAssignmentsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: SingleAssignmentsEditComponent, pathMatch: 'full' },
    ]
  },
];

export const singleAssignmentsComponents: any[] = [
  SingleAssignmentsIndexComponent,
  SingleAssignmentsCreateComponent,
  SingleAssignmentsEditComponent,
];
