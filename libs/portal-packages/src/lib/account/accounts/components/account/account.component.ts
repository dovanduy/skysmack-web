import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgAccountsMenu } from '../../ng-accounts-menu';
import { AccountState } from '@skysmack/packages-account';

@Component({
  selector: 'skysmack-account',
  templateUrl: './account.component.html'
})
export class AccountComponent extends BaseComponent<AccountState, unknown> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public sidebarMenu: NgAccountsMenu
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
