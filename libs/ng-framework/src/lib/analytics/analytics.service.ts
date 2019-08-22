import { Injectable } from '@angular/core';
import { GlobalProperties } from '@skysmack/framework';

declare var gtag: Function;

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    constructor() { }

    public event(eventName: string, params: {}) {
        gtag('event', eventName, params);
    }

    public init() {
        this.insertgoogleTagManagerHeadScript();
    }

    private insertgoogleTagManagerHeadScript() {
        if (GlobalProperties.production) {
            try {
                const headScript = document.createElement('script');
                headScript.async = true;
                headScript.innerHTML = `
                (function (w, d, s, l, i) {
                    w[l] = w[l] || []; w[l].push({
                        'gtm.start':
                            new Date().getTime(), event: 'gtm.js'
                    }); var f = d.getElementsByTagName(s)[0],
                        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', 'GTM-M8NH5DN');
            `;
                document.head.appendChild(headScript);
            } catch (ex) {
                console.error('Error appending google analytics');
                console.error(ex);
            }
        }
    }
}