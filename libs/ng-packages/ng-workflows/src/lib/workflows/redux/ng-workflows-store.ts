import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Workflow, WorkflowsAppState, WORKFLOWS_REDUCER_KEY } from '@skysmack/packages-workflows';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgWorkflowsStore extends NgRecordStore<WorkflowsAppState, Workflow, number> {
    constructor(
        protected ngRedux: NgRedux<WorkflowsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, WORKFLOWS_REDUCER_KEY); }
}
