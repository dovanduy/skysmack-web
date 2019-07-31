import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { AuthorizationInterceptor } from '@skysmack/ng-framework';
import { SkysmackCommercialApiDomain } from '../requests/skysmack-commercial-api-domain';

export const configurations = [
];

export const httpInterceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
];

export const injectionTokens = [
    { provide: API_DOMAIN_INJECTOR_TOKEN, useClass: SkysmackCommercialApiDomain }
];

export const commercialApplicationStartup = [
    ...configurations,
    ...httpInterceptors,
    ...injectionTokens
];

