import { NgModule } from '@angular/core';
import { assignmentReducer, assignmentTypesReducer, maintenanceStatesReducer, recurringAssignmentsReducer, RECURRING_ASSIGNMENTS_REDUCER_KEY, MAINTENANCE_STATES_REDUCER_KEY, ASSIGNMENT_TYPES_REDUCER_KEY, ASSIGNMENTS_REDUCER_KEY } from '@skysmack/packages-maintenance';

import { registerRedux } from '@skysmack/ng-framework';
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
    registerRedux(ASSIGNMENTS_REDUCER_KEY, assignmentReducer, assignmentsEpics);
    registerRedux(ASSIGNMENT_TYPES_REDUCER_KEY, assignmentTypesReducer, assignmentTypesEpics);
    registerRedux(MAINTENANCE_STATES_REDUCER_KEY, maintenanceStatesReducer, maintenanceStatesEpics);
    registerRedux(RECURRING_ASSIGNMENTS_REDUCER_KEY, recurringAssignmentsReducer, recurringAssignmentsEpics);
  }
}
