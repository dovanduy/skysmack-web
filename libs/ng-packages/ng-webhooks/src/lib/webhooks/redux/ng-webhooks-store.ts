import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Webhook, WebhooksAppState, WEBHOOKS_REDUCER_KEY } from '@skysmack/packages-webhooks';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgWebhooksStore extends NgRecordStore<WebhooksAppState, Webhook, number> {
    constructor(
        protected ngRedux: NgRedux<WebhooksAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, WEBHOOKS_REDUCER_KEY); }
}
