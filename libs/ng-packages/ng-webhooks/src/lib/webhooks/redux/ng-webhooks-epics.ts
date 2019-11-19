import { Webhook, WEBHOOKS_REDUX_KEY } from '@skysmack/packages-webhooks';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Injectable } from '@angular/core';
import { NgWebhooksRequests } from './ng-webhooks-requests';
import { NgWebhooksNotifications } from '../ng-webhooks-notifications';

@Injectable({ providedIn: 'root' })
export class WebhooksEpics extends RecordEpicsBase<Webhook, number> {
    constructor(protected requests: NgWebhooksRequests, protected notifications: NgWebhooksNotifications) {
        super(requests, WEBHOOKS_REDUX_KEY, notifications);
    }
}
