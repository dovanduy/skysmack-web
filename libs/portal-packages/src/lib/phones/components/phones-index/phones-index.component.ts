import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-portal-package-phones-index',
  templateUrl: './phones-index.component.html'
})
export class PhonesIndexComponent extends BaseComponent<any, any> implements OnInit {
  public static COMPONENT_KEY = 'phones-index';
  public componentKey = PhonesIndexComponent.COMPONENT_KEY;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public title: EntityComponentPageTitle,
  ) {
    super(router, activatedRoute, skysmackStore, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
