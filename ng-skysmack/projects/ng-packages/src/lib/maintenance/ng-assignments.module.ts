import { NgModule } from '@angular/core';
import { ReducerRegistry } from '@skysmack/redux';
import { assignmentReducer, assignmentTypesReducer, maintenanceStateReducer, recurringAssignmentsReducer } from '@skysmack/packages-maintenance';
import { NgAssignmentsEpics } from './redux/ng-assignments-epics';
import { NgAssignmentTypesEpics } from './redux/ng-assignment-types-epics';
import { NgMaintenanceStatesEpics } from './redux/ng-maintenance-states-epics';
import { NgRecurringAssignmentsEpics } from './redux/ng-recurring-assignments-epics';
import { registerEpics } from '@skysmack/ng-redux';

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
    ReducerRegistry.Instance.register('assignments', assignmentReducer);
    ReducerRegistry.Instance.register('assignmentTypes', assignmentTypesReducer);
    ReducerRegistry.Instance.register('maintenanceStates', maintenanceStateReducer);
    ReducerRegistry.Instance.register('recurringAssignments', recurringAssignmentsReducer);
    registerEpics(assignmentsEpics);
    registerEpics(assignmentTypesEpics);
    registerEpics(maintenanceStatesEpics);
    registerEpics(recurringAssignmentsEpics);
  }
}
