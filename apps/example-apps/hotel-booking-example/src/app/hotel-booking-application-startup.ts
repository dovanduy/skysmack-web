import { API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { HotelBookingApiDomain } from '../requests';
import { NOTIFICATIONS_INJECTOR_TOKEN } from '@skysmack/ng-framework';
import { NgNotifications } from './ng-notifications';
import { APP_INITIALIZER } from '@angular/core';
import { NgSkysmackActions } from '@skysmack/ng-skysmack';

export function configureSkysmack(actions: NgSkysmackActions) {
    return () => actions.getSkysmack();
}

export const configurations = [
    { provide: NOTIFICATIONS_INJECTOR_TOKEN, useClass: NgNotifications },
    { provide: APP_INITIALIZER, useFactory: configureSkysmack, deps: [NgSkysmackActions], multi: true },
];

export const httpInterceptors = [];

export const injectionTokens = [
    { provide: API_DOMAIN_INJECTOR_TOKEN, useClass: HotelBookingApiDomain }
];

export const hotelBookingApplicationStartup = [
    ...configurations,
    ...httpInterceptors,
    ...injectionTokens
];

