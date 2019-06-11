import { Component, OnInit } from '@angular/core';
import { NgAccessPoliciesDashboardMenu } from '../../ng-access-policies-dashboard-menu';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';

@Component({
  selector: 'ss-access-policies-dashboard',
  templateUrl: './access-policies-dashboard.component.html'
})
export class AccessPoliciesDashboardComponent implements OnInit {

  constructor(
    public sidebarMenu: NgAccessPoliciesDashboardMenu,
    public componentPageTitle: EntityComponentPageTitle
  ) { }

  ngOnInit() {
    this.componentPageTitle.setTitle('ACCESS_POLICIES.TITLE');
  }

}
