import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { WebhooksAppState, Webhook, WEBHOOKS_ADDITIONAL_PATHS, WEBHOOKS_REDUX_KEY } from '@skysmack/packages-webhooks';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgWebhooksActions extends RecordActionsBase<WebhooksAppState, NgRedux<WebhooksAppState>> {
    constructor(protected store: NgRedux<WebhooksAppState>) { super(store, WEBHOOKS_REDUX_KEY, WEBHOOKS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Webhook, number>): StrIndex<string> {
        return {
            url: record.object.url
        };
    }
}
