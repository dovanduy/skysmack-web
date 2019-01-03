import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { assignmentsRoutes } from './components/assignments-components';
import { assignmentTypesRoutes } from './components/assignment-types-components';
import { maintenanceStatesRoutes } from './components/maintenance-states-components';
import { recurringAssignmentsRoutes } from './components/recurring-assignments-components';
import { assignmentsAllRoutes } from './components/assignments-all-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...assignmentsRoutes,
    ...assignmentsAllRoutes,
    ...recurringAssignmentsRoutes,
    ...assignmentTypesRoutes,
    ...maintenanceStatesRoutes
  ])],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
