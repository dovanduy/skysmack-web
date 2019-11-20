import { Template, TEMPLATES_REDUX_KEY } from '@skysmack/packages-templates';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Injectable } from '@angular/core';
import { NgTemplatesRequests } from './ng-templates-requests';
import { NgTemplatesNotifications } from '../ng-templates-notifications';

@Injectable({ providedIn: 'root' })
export class TemplatesEpics extends RecordEpicsBase<Template, number> {
    constructor(protected requests: NgTemplatesRequests, protected notifications: NgTemplatesNotifications) {
        super(requests, TEMPLATES_REDUX_KEY, notifications);
    }
}
