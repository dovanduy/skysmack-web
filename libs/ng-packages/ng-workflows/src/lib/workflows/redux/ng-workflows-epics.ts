import { Workflow, WORKFLOWS_REDUX_KEY } from '@skysmack/packages-workflows';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Injectable } from '@angular/core';
import { NgWorkflowsRequests } from './ng-workflows-requests';
import { NgWorkflowsNotifications } from '../ng-workflows-notifications';

@Injectable({ providedIn: 'root' })
export class WorkflowsEpics extends RecordEpicsBase<Workflow, number> {
    constructor(protected requests: NgWorkflowsRequests, protected notifications: NgWorkflowsNotifications) {
        super(requests, WORKFLOWS_REDUX_KEY, notifications);
    }
}
