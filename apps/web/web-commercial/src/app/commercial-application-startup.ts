import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { SkysmackCommercialApiDomain } from '../requests/skysmack-commercial-api-domain';
import { RefreshTokenInterceptor } from '@skysmack/ng-oauth2';
import { APP_INITIALIZER } from '@angular/core';
import { configureLanguage, LanguageService } from '@skysmack/ng-translation';

export const configurations = [
    { provide: APP_INITIALIZER, useFactory: configureLanguage('da'), deps: [LanguageService], multi: true }
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

