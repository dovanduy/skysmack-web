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

        // Local production testing
        const localApi = 'http://localhost:52678';
        const localProdClient = 'localhost:4200';

        const devHostClient = 'skysmack.test';
        const devPortalHostApi = 'localhost:52678';
        const devTenantsHostApi = 'localhost:52678';

        // Production builds
        const prodHostClient = 'skysmack.net';
        const prodHostApi = 'skysmack.io';

        const urlInfo = new Url();

        const notLocalTesting = urlInfo.host !== localProdClient;

        if (environment.production && notLocalTesting) {
            if (urlInfo.noPortHost.endsWith(prodHostClient) && urlInfo.subdomain.length > 0) {
                apiDomain = 'https://' + urlInfo.subdomain + '.' + prodHostApi;
            } else {
                apiDomain = 'https://' + prodHostApi;
            }
        } else {
            if (urlInfo.noPortHost.endsWith(devHostClient)) {
                if (urlInfo.subdomain.length > 0) {
                    apiDomain = urlInfo.httpProtocol + urlInfo.subdomain + '.' + devPortalHostApi;
                } else {
                    apiDomain = urlInfo.httpProtocol + devTenantsHostApi;
                }
            } else {
                apiDomain = localApi;
            }
        }

        return apiDomain;
    }
}
