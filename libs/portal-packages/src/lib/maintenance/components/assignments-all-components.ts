import { Routes } from '@angular/router';
import { AssignmentsAllIndexComponent } from './assignments-all/assignments-all.component';

export const assignmentsAllRoutes: Routes = [
  {
    path: '', component: AssignmentsAllIndexComponent
  },
];

export const assignmentsAllComponents: any[] = [
  AssignmentsAllIndexComponent
];
