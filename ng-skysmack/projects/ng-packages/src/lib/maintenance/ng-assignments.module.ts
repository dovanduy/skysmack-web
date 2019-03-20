import { NgModule } from '@angular/core';
import { assignmentReducer, assignmentTypesReducer, maintenanceStateReducer, recurringAssignmentsReducer, ASSIGNMENTS_AREA_KEY, ASSIGNMENT_TYPES_AREA_KEY } from '@skysmack/packages-maintenance';
import { NgAssignmentsEpics } from './redux/ng-assignments-epics';
import { NgAssignmentTypesEpics } from './redux/ng-assignment-types-epics';
import { NgMaintenanceStatesEpics } from './redux/ng-maintenance-states-epics';
import { NgRecurringAssignmentsEpics } from './redux/ng-recurring-assignments-epics';
import { registerRedux } from '@skysmack/ng-redux';

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
    registerRedux('maintenanceStates', maintenanceStateReducer, maintenanceStatesEpics);
    registerRedux('recurringAssignments', recurringAssignmentsReducer, recurringAssignmentsEpics);
  }
}
