import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiDomain, Url } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class SkysmackApiDomain implements ApiDomain {
    public domain: string;

    constructor() {
        this.domain = this.getApiDomain();
    }

    private getApiDomain(): string {
        let apiDomain = '';

        // Local production testing
        const localApi = 'http://www.skysmack.test:4000';
        const localProdClient = 'www.skysmack.test:4000';
        const devHostClient = 'skysmack.test';
        const devPortalHostApi = 'skysmack-io.test:2000';
        const devTenantsHostApi = 'skysmack-io.test:3000';

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
