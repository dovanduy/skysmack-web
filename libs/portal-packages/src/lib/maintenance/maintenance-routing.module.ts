import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { assignmentTypesRoutes } from './assignment-types/components/assignment-types-components';
import { maintenanceStatesRoutes } from './maintenance-states/components/maintenance-states-components';
import { recurringAssignmentsRoutes } from './recurring-assignments/components/recurring-assignments-components';
import { assignmentsAllRoutes } from './components/assignments-all-components';
import { DefaultComponent } from '@skysmack/portal-ui';
import { singleAssignmentsRoutes } from './single-assignments/components/single-assignments-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...assignmentsAllRoutes,
        ...singleAssignmentsRoutes,
        ...assignmentTypesRoutes,
        ...maintenanceStatesRoutes,
        ...recurringAssignmentsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
