import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { assignmentsRoutes } from './assignments/components/assignments-components';
import { assignmentTypesRoutes } from './assignment-types/components/assignment-types-components';
import { maintenanceStatesRoutes } from './maintenance-states/components/maintenance-states-components';
import { recurringAssignmentsRoutes } from './recurring-assignments/components/recurring-assignments-components';
import { assignmentsAllRoutes } from './components/assignments-all-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...assignmentsRoutes,
        ...assignmentsAllRoutes,
        ...recurringAssignmentsRoutes,
        ...assignmentTypesRoutes,
        ...maintenanceStatesRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
