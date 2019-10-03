import { NgModule } from '@angular/core';
import { assignmentTypesReducer, maintenanceStatesReducer, recurringAssignmentsReducer, RECURRING_ASSIGNMENTS_REDUCER_KEY, MAINTENANCE_STATES_REDUCER_KEY, ASSIGNMENT_TYPES_REDUCER_KEY, SINGLE_ASSIGNMENTS_REDUCER_KEY, singleAssignmentsReducer } from '@skysmack/packages-maintenance';
import { registerRedux } from '@skysmack/ng-framework';
import { NgAssignmentTypesEpics } from './assignment-types/redux/ng-assignment-types-epics';
import { NgMaintenanceStatesEpics } from './maintenance-states/redux/ng-maintenance-states-epics';
import { NgRecurringAssignmentsEpics } from './recurring-assignments/redux/ng-recurring-assignments-epics';
import { NgSingleAssignmentsEpics } from './single-assignments/redux/ng-single-assignments-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgMaintenanceModule {
  constructor(
    singleAssignmentsEpics: NgSingleAssignmentsEpics,
    assignmentTypesEpics: NgAssignmentTypesEpics,
    maintenanceStatesEpics: NgMaintenanceStatesEpics,
    recurringAssignmentsEpics: NgRecurringAssignmentsEpics
  ) {
    registerRedux(SINGLE_ASSIGNMENTS_REDUCER_KEY, singleAssignmentsReducer, singleAssignmentsEpics);
    registerRedux(ASSIGNMENT_TYPES_REDUCER_KEY, assignmentTypesReducer, assignmentTypesEpics);
    registerRedux(MAINTENANCE_STATES_REDUCER_KEY, maintenanceStatesReducer, maintenanceStatesEpics);
    registerRedux(RECURRING_ASSIGNMENTS_REDUCER_KEY, recurringAssignmentsReducer, recurringAssignmentsEpics);
  }
}
