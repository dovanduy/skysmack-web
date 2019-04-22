import { Routes } from '@angular/router';
import { AssignmentTypesIndexComponent } from './assignment-types-index/assignment-types-index.component';
import { AssignmentTypesCreateComponent } from './assignment-types-create/assignment-types-create.component';
import { AssignmentTypesEditComponent } from './assignment-types-edit/assignment-types-edit.component';

export const assignmentTypesRoutes: Routes = [
  {
    path: 'assignments/types', component: AssignmentTypesIndexComponent, children: [
      { path: 'create', component: AssignmentTypesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: AssignmentTypesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const assignmentTypesComponents: any[] = [
  AssignmentTypesIndexComponent,
  AssignmentTypesCreateComponent,
  AssignmentTypesEditComponent,
];
