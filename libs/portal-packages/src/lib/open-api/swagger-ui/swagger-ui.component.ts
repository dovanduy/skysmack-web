import {AfterViewInit, Component, ElementRef, ViewEncapsulation, Inject} from '@angular/core';

import SwaggerUI from 'swagger-ui';
import { API_DOMAIN_INJECTOR_TOKEN, ApiDomain } from '@skysmack/framework';

@Component({
  selector: 'ss-swagger-ui',
  templateUrl: './swagger-ui.component.html',
   styleUrls: [ 
    'swagger-ui.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class SwaggerUiComponent implements AfterViewInit {

  constructor(private el: ElementRef,
    @Inject(API_DOMAIN_INJECTOR_TOKEN) private apiDomain: ApiDomain) {
  }

  ngAfterViewInit() {
    console.log('domain', this.apiDomain);
    const ui = SwaggerUI({
      url: this.apiDomain.domain + '/open-api',
      domNode: this.el.nativeElement.querySelector('.swagger-container'),
      deepLinking: true,
      presets: [
        SwaggerUI.presets.apis
      ],
    });
  }
}