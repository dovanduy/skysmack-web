import { NgEmailTemplatesRequests } from './ng-email-templates-requests';
import { EmailTemplate, EMAIL_TEMPLATES_REDUX_KEY } from '@skysmack/packages-emails';
import { Injectable } from '@angular/core';
import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { NgEmailTemplatesNotifications } from '../ng-email-templates-notifications';


@Injectable({ providedIn: 'root' })
export class NgEmailTemplatesEpics extends RecordEpicsBase<EmailTemplate, number> {
    constructor(
        protected requests: NgEmailTemplatesRequests,
        protected notifications: NgEmailTemplatesNotifications,
    ) {
        super(requests, EMAIL_TEMPLATES_REDUX_KEY, notifications);
    }
}
