import { Injectable } from '@angular/core';

declare var gtag: Function;
declare var dataLayer: any;

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    constructor() { }

    public acceptCookies(): void {
        gtag('js', new Date());
        gtag('config', 'GTM-M8NH5DN', { 'send_page_view': false });
        dataLayer.push({ 'event': 'cookie_consent_given' });
    }
}