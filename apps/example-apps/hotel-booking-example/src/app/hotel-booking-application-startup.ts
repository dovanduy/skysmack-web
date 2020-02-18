import { API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { HotelBookingApiDomain } from '../requests';

export const configurations = [];

export const httpInterceptors = [];

export const injectionTokens = [
    { provide: API_DOMAIN_INJECTOR_TOKEN, useClass: HotelBookingApiDomain }
];

export const hotelBookingApplicationStartup = [
    ...configurations,
    ...httpInterceptors,
    ...injectionTokens
];

