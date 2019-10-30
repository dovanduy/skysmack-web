import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-portal-package-pbx_3cx-index',
  templateUrl: './3cx-index.component.html'
})
export class PBX_3CXIndexComponent extends BaseComponent<any, any> implements OnInit {
  public static COMPONENT_KEY = '3cx-index';
  public componentKey = PBX_3CXIndexComponent.COMPONENT_KEY;

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
