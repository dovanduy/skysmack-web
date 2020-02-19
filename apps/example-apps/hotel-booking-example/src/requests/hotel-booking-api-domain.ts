import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiDomain } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class HotelBookingApiDomain implements ApiDomain {
    public domain: string;

    constructor() {
        if (environment.production) {
            this.domain = 'https://api.skysmack.com';
        } else {
            this.domain = `http://${environment.subdomain}.skysmack-io.test:2000`;
        }
    }
}
