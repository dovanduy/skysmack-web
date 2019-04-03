import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgIdentitiesIndexMenu } from '../../ng-identities-index-menu';
import { IDENTITES_AREA_KEY } from '@skysmack/packages-identities';

@Component({
  selector: 'ss-portal-package-identities-index',
  templateUrl: './identities-index.component.html'
})
export class IdentitiesIndexComponent implements OnInit {

  constructor(
    public title: EntityComponentPageTitle,
    public sidebarMenu: NgIdentitiesIndexMenu
  ) { }

  ngOnInit() {
    this.title.setTitle(IDENTITES_AREA_KEY);
  }
}
