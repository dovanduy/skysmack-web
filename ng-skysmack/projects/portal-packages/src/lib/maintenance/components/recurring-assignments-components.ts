import { Routes } from '@angular/router';
import { RecurringAssignmentsCreateComponent } from './recurring-assignments-create/recurring-assignments-create.component';
import { RecurringAssignmentsEditComponent } from './recurring-assignments-edit/recurring-assignments-edit.component';
import { RecurringAssignmentsIndexComponent } from './recurring-assignments-index/recurring-assignments-index.component';


export const recurringAssignmentsRoutes: Routes = [
  {
    path: 'assignments/recurring', component: RecurringAssignmentsIndexComponent,
    children: [
      { path: 'create', component: RecurringAssignmentsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: RecurringAssignmentsEditComponent, pathMatch: 'full' }
    ]
  },
];

export const recurringAssignmentsComponents: any[] = [
  RecurringAssignmentsIndexComponent,
  RecurringAssignmentsCreateComponent,
  RecurringAssignmentsEditComponent,
];
