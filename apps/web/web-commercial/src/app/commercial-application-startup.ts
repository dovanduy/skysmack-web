import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { SkysmackCommercialApiDomain } from '../requests/skysmack-commercial-api-domain';
import { RefreshTokenInterceptor } from '@skysmack/ng-oauth2';

export const configurations = [
];

export const httpInterceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }
];

export const injectionTokens = [
    { provide: API_DOMAIN_INJECTOR_TOKEN, useClass: SkysmackCommercialApiDomain }
];

export const commercialApplicationStartup = [
    ...configurations,
    ...httpInterceptors,
    ...injectionTokens
];

