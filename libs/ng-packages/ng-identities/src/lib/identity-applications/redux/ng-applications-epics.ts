import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Application, APPLICATIONS_REDUX_KEY } from '@skysmack/packages-identities';
import { NgApplicationsRequests } from './ng-applications-requests';
import { Injectable } from '@angular/core';
import { NgApplicationsNotifications } from '../ng-applications-notifications';

@Injectable({ providedIn: 'root' })
export class NgApplicationsEpics extends RecordEpicsBase<Application, number> {
    constructor(protected requests: NgApplicationsRequests, protected notifications: NgApplicationsNotifications) {
        super(requests, APPLICATIONS_REDUX_KEY, notifications);
    }
}
