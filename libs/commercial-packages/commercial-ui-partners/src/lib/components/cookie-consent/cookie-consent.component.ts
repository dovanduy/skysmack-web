import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '@skysmack/ng-framework';

@Component({
  selector: 'ss-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit, OnDestroy {

  public showCookieBanner: boolean = true;

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public acceptCookies() {
    this.showCookieBanner = false;
    this.analyticsService.acceptCookies();
  }
}
