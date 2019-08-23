import { Component, OnInit, OnDestroy } from '@angular/core';

declare const dataLayer: any;

@Component({
  selector: 'ss-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit, OnDestroy {
  public showCookieBanner: boolean = false;

  constructor(
  ) { }

  ngOnInit() {
    if (document.cookie.indexOf('_ga') == -1) {
      this.showCookieBanner = true;
    } else {
      this.acceptCookies();
    }
  }

  ngOnDestroy() {
  }

  public acceptCookies(): void {
    this.showCookieBanner = false;
    dataLayer.push({ 'event': 'cookie_consent_given' });
  }
}
