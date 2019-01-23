import { Component, OnInit } from '@angular/core';
import { NgAccessPoliciesDashboardMenu } from '../../ng-access-policies-dashboard-menu';

@Component({
  selector: 'ss-portal-package-access-policies-dashboard',
  templateUrl: './access-policies-dashboard.component.html',
  styleUrls: ['./access-policies-dashboard.component.scss']
})
export class AccessPoliciesDashboardComponent implements OnInit {

  constructor(
    public sidebarMenu: NgAccessPoliciesDashboardMenu
  ) { }

  ngOnInit() {
  }

}
