import { NgModule } from '@angular/core';
import { assignmentTypesReducer, maintenanceStatesReducer, ASSIGNMENTS_SCHEDULES_REDUCER_KEY, MAINTENANCE_STATES_REDUCER_KEY, ASSIGNMENT_TYPES_REDUCER_KEY, SINGLE_ASSIGNMENTS_REDUCER_KEY, singleAssignmentsReducer, assignmentsSchedulesReducer, assignmentsReducer, ASSIGNMENTS_KEY } from '@skysmack/packages-maintenance';
import { registerRedux } from '@skysmack/ng-framework';
import { NgAssignmentTypesEpics } from './assignment-types/redux/ng-assignment-types-epics';
import { NgMaintenanceStatesEpics } from './maintenance-states/redux/ng-maintenance-states-epics';
import { NgSingleAssignmentsEpics } from './single-assignments/redux/ng-single-assignments-epics';
import { NgAssignmentsSchedulesEpics } from './assignments-schedules/redux/ng-assignments-schedules-epics';
import { NgAssignmentsEpics } from './assignments/redux/ng-assignments-epics';

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
    assignmentsSchedulesEpics: NgAssignmentsSchedulesEpics,
    assignmentsEpics: NgAssignmentsEpics
  ) {
    registerRedux(ASSIGNMENTS_KEY, assignmentsReducer, assignmentsEpics);
    registerRedux(SINGLE_ASSIGNMENTS_REDUCER_KEY, singleAssignmentsReducer, singleAssignmentsEpics);
    registerRedux(ASSIGNMENT_TYPES_REDUCER_KEY, assignmentTypesReducer, assignmentTypesEpics);
    registerRedux(MAINTENANCE_STATES_REDUCER_KEY, maintenanceStatesReducer, maintenanceStatesEpics);
    registerRedux(ASSIGNMENTS_SCHEDULES_REDUCER_KEY, assignmentsSchedulesReducer, assignmentsSchedulesEpics);
  }
}
