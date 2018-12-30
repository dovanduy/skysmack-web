import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Url } from '../models/url';
import { ApiDomain } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class SkysmackApiDomain implements ApiDomain {
    public domain: string;

    constructor() {
        this.domain = this.getApiDomain();
    }

    private getApiDomain(): string {
        let apiDomain = '';

        // TODO: When is this needed?
        const localApi = 'http://www.skysmack.test:4000';

        // Local production testing
        const localProdClient = 'www.skysmack.test:4000';
        const devHostClient = 'skysmack.test';
        const devPortalHostApi = 'skysmack-io.test:2000';
        const devTenantsHostApi = 'skysmack-io.test:3000';

        // Production builds
        const prodHostClient = 'skysmack.net';
        const prodHostApi = 'skysmack.io';

        const urlInfo = this.getUrl();

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

    private getUrl(): Url {
        const host = window.location.host;
        const parts: any = this.splitHostname();

        return new Url({
            origin: window.location.origin,
            host: host,
            noPortHost: this.stripPortNumber(host),
            httpProtocol: this.extractHttpProtocol(host),
            subdomain: parts.subdomain,
            domain: parts.domain,
            path: window.location.pathname,
            port: Number(window.location.port),
            protocol: window.location.protocol
        } as Url);
    }

    private splitHostname(): {} {
        const result: any = {};
        const regexParse = new RegExp('([a-z\-0-9]{2,63})\.([a-z\.]{2,5})$');
        const urlParts = regexParse.exec(window.location.hostname);
        result.domain = urlParts[1];
        result.type = urlParts[2];
        result.subdomain = window.location.hostname.replace(result.domain + '.' + result.type, '').slice(0, -1);
        return result;
    }

    private stripPortNumber(host: string): string {
        return host.split(':')[0];
    }

    private extractHttpProtocol(host: string): string {
        return host.includes('https') ? 'https://' : 'http://';
    }
}
