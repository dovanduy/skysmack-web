import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';

@Component({
  selector: 'ss-access-policies-dashboard',
  templateUrl: './access-policies-dashboard.component.html'
})
export class AccessPoliciesDashboardComponent implements OnInit {
  public static COMPONENT_KEY = 'access-policies-dashboard';
  public componentKey = AccessPoliciesDashboardComponent.COMPONENT_KEY;

  constructor(
    public componentPageTitle: EntityComponentPageTitle
  ) { }

  ngOnInit() {
    this.componentPageTitle.setTitle('ACCESS_POLICIES.TITLE');
  }

}
