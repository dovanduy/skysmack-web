import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgCorsActions, NgCorsStore } from '@skysmack/ng-cors';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-cors-index',
  templateUrl: './cors-index.component.html'
})
export class CorsIndexComponent extends BaseComponent<any, any> implements OnInit {
  public static COMPONENT_KEY = 'cors-index';
  public componentKey = CorsIndexComponent.COMPONENT_KEY;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgCorsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgCorsStore,
    public title: EntityComponentPageTitle,
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
