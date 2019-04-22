import { NgModule } from '@angular/core';
import { assignmentReducer, assignmentTypesReducer, maintenanceStateReducer, recurringAssignmentsReducer, ASSIGNMENTS_AREA_KEY, ASSIGNMENT_TYPES_AREA_KEY, MAINTENANCE_STATES_AREA_KEY, RECURRING_ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';

import { registerRedux } from '@skysmack/ng-redux';
import { NgAssignmentsEpics } from './assignments/redux/ng-assignments-epics';
import { NgAssignmentTypesEpics } from './assignment-types/redux/ng-assignment-types-epics';
import { NgMaintenanceStatesEpics } from './maintenance-states/redux/ng-maintenance-states-epics';
import { NgRecurringAssignmentsEpics } from './recurring-assignments/redux/ng-recurring-assignments-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgAssignmentsModule {
  constructor(
    assignmentsEpics: NgAssignmentsEpics,
    assignmentTypesEpics: NgAssignmentTypesEpics,
    maintenanceStatesEpics: NgMaintenanceStatesEpics,
    recurringAssignmentsEpics: NgRecurringAssignmentsEpics
  ) {
    registerRedux(ASSIGNMENTS_AREA_KEY, assignmentReducer, assignmentsEpics);
    registerRedux(ASSIGNMENT_TYPES_AREA_KEY, assignmentTypesReducer, assignmentTypesEpics);
    registerRedux(MAINTENANCE_STATES_AREA_KEY, maintenanceStateReducer, maintenanceStatesEpics);
    registerRedux(RECURRING_ASSIGNMENTS_AREA_KEY, recurringAssignmentsReducer, recurringAssignmentsEpics);
  }
}
