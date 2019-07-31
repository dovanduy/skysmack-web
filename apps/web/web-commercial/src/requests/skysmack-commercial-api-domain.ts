import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiDomain, Url } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class SkysmackCommercialApiDomain implements ApiDomain {
    public domain: string;

    constructor() {
        this.domain = this.getApiDomain();
    }

    private getApiDomain(): string {
        let apiDomain = '';
        const localApi = 'http://localhost:4200';
        const localProdClient = 'localhost:4200';
        const urlInfo = new Url();
        const notLocalTesting = urlInfo.host !== localProdClient;

        if (environment.production && notLocalTesting) {
            // TODO: Implement product logic here.
        } else {
            apiDomain = localApi;
        }

        return apiDomain;
    }
}
