import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { assignmentTypesRoutes } from './assignment-types/components/assignment-types-components';
import { maintenanceStatesRoutes } from './maintenance-states/components/maintenance-states-components';
import { assignmentsAllRoutes } from './components/assignments-all-components';
import { DefaultComponent } from '@skysmack/portal-ui';
import { singleAssignmentsRoutes } from './single-assignments/components/single-assignments-components';
import { assignmentsSchedulesRoutes } from './assignments-schedules';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...assignmentsAllRoutes,
        ...singleAssignmentsRoutes,
        ...assignmentTypesRoutes,
        ...maintenanceStatesRoutes,
        ...assignmentsSchedulesRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
