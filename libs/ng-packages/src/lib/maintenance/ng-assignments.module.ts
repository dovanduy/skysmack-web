import { NgModule } from '@angular/core';
import { assignmentReducer, assignmentTypesReducer, maintenanceStatesReducer, recurringAssignmentsReducer } from '@skysmack/packages-maintenance';

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
    registerRedux('assignments', assignmentReducer, assignmentsEpics);
    registerRedux('assignmentTypes', assignmentTypesReducer, assignmentTypesEpics);
    registerRedux('maintenanceStates', maintenanceStatesReducer, maintenanceStatesEpics);
    registerRedux('recurringAssignments', recurringAssignmentsReducer, recurringAssignmentsEpics);
  }
}
