import { NgModule } from '@angular/core';
import { workflowsReducer, WORKFLOWS_REDUCER_KEY } from '@skysmack/packages-workflows';
import { WorkflowsEpics } from './workflows/redux/ng-workflows-epics';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgWorkflowsModule {
  constructor(
    workflowsEpics: WorkflowsEpics,
  ) {
    registerRedux(WORKFLOWS_REDUCER_KEY, workflowsReducer, workflowsEpics);
  }
}
