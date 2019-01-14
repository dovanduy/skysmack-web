import { NgModule } from '@angular/core';
import { ReducerRegistry } from '@skysmack/redux';
import { AssignmentsEpics, assignmentReducer, assignmentTypesReducer, AssignmentTypesEpics } from '@skysmack/packages-maintenance';
import { NgAssignmentsRequests } from './redux/ng-assignments-requests';
import { NgAssignmentTypesRequests } from './redux/ng-assignment-types-requests';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgAssignmentsModule {
  constructor(assignmentsRequests: NgAssignmentsRequests, assignmentTypesRequests: NgAssignmentTypesRequests) {
    ReducerRegistry.Instance.register('assignments', assignmentReducer);
    // registerLazyEpics(new AssignmentsEpics(assignmentsRequests).epics);

    ReducerRegistry.Instance.register('assignmentTypes', assignmentTypesReducer);
    // registerLazyEpics(new AssignmentTypesEpics(assignmentTypesRequests).epics);
  }
}
