import { Injectable, Inject } from '@angular/core';
import { API_DOMAIN_INJECTOR_TOKEN, ApiDomain } from '@skysmack/framework';
import { SignalR } from '@skysmack/signal-r';

@Injectable({ providedIn: 'root' })
export class NgSignalR {
    public instance: SignalR;

    constructor(@Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain) {
        // SignalR.API_DOMAIN = apiDomain;
        // this.instance = SignalR.Instance;
    }
}