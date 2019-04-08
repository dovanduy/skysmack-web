import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';

@Component({
  selector: 'ss-front-page',
  templateUrl: './front-page.component.html'
})
export class FrontPageComponent implements OnInit {

  constructor(public componentPageTitle: EntityComponentPageTitle) { }

  ngOnInit() {
    this.componentPageTitle.setTitle('Skysmack', true);
  }

}
