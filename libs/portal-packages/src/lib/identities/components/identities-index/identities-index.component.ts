import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, BaseComponent } from '@skysmack/portal-ui';
import { NgIdentitiesIndexMenu } from '../../ng-identities-index-menu';
import { IDENTITES_AREA_KEY } from '@skysmack/packages-identities';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-portal-package-identities-index',
  templateUrl: './identities-index.component.html'
})
export class IdentitiesIndexComponent extends BaseComponent<any, any> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public sidebarMenu: NgIdentitiesIndexMenu
  ) { 
    super(router, activatedRoute, skysmackStore, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
