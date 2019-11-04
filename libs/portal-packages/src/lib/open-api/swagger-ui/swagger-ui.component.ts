import { AfterViewInit, Component, ElementRef, ViewEncapsulation, Inject } from '@angular/core';

import SwaggerUI from 'swagger-ui';
import { API_DOMAIN_INJECTOR_TOKEN, ApiDomain, SubscriptionHandler } from '@skysmack/framework';
import { Router } from '@angular/router';
import { NgAuthenticationStore } from '@skysmack/ng-framework';
import { map, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from '@skysmack/portal-settings';

@Component({
  selector: 'ss-swagger-ui',
  templateUrl: './swagger-ui.component.html',
  styleUrls: [
    'swagger-ui.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwaggerUiComponent implements AfterViewInit {
  private subscriptionHandler = new SubscriptionHandler();

  constructor(private el: ElementRef,
    private router: Router,
    private authenticationStore: NgAuthenticationStore,
    private dialog: MatDialog,
    @Inject(API_DOMAIN_INJECTOR_TOKEN) private apiDomain: ApiDomain) {
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  ngAfterViewInit() {
    this.subscriptionHandler.register(this.authenticationStore.getCurrentUser().pipe(
      map(currentUser => {
        const ui = SwaggerUI({
          url: this.apiDomain.domain + '/' + this.router.url.split('/')[1],
          domNode: this.el.nativeElement.querySelector('.swagger-container'),
          deepLinking: false,
          docExpansion: 'none',
          presets: [
            SwaggerUI.presets.apis
          ],
          requestInterceptor: (req) => {
            if (req.loadSpec && currentUser && currentUser.access_token.length) {
              req.headers.Authorization = "Bearer " + currentUser.access_token
            }
            return req
          }
        });
      }),
      take(1)
    ).subscribe());
  }

  settings() {
    this.dialog.open(SettingsComponent);
  }
}