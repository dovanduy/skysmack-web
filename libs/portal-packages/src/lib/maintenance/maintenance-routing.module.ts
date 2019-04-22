import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { assignmentsRoutes } from './assignments/components/assignments-components';
import { assignmentTypesRoutes } from './assignment-types/components/assignment-types-components';
import { maintenanceStatesRoutes } from './maintenance-states/components/maintenance-states-components';
import { recurringAssignmentsRoutes } from './recurring-assignments/components/recurring-assignments-components';
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
