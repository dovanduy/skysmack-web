import {AfterViewInit, Component, ElementRef, ViewEncapsulation, Inject} from '@angular/core';

import SwaggerUI from 'swagger-ui';
import { API_DOMAIN_INJECTOR_TOKEN, ApiDomain } from '@skysmack/framework';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-swagger-ui',
  templateUrl: './swagger-ui.component.html',
   styleUrls: [ 
    'swagger-ui.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class SwaggerUiComponent implements AfterViewInit {

  constructor(private el: ElementRef,
    private router: Router,
    @Inject(API_DOMAIN_INJECTOR_TOKEN) private apiDomain: ApiDomain) {
  }

  ngAfterViewInit() {
    const ui = SwaggerUI({
      url: this.apiDomain.domain + '/' + this.router.url.split('/')[1],
      domNode: this.el.nativeElement.querySelector('.swagger-container'),
      deepLinking: true,
      docExpansion: 'none',
      presets: [
        SwaggerUI.presets.apis
      ]
    });
  }
}