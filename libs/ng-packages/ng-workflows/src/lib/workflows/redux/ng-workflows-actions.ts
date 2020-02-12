import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { WorkflowsAppState, Workflow, WORKFLOWS_ADDITIONAL_PATHS, WORKFLOWS_REDUX_KEY } from '@skysmack/packages-workflows';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgWorkflowsActions extends RecordActionsBase<WorkflowsAppState, NgRedux<WorkflowsAppState>> {
    constructor(protected store: NgRedux<WorkflowsAppState>) { super(store, WORKFLOWS_REDUX_KEY, WORKFLOWS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Workflow, number>): StrIndex<string> {
        return {
            url: record.object.url
        };
    }
}
