import { Component, OnInit } from '@angular/core';
import { DashboardsProvider } from '@skysmack/ng-framework';

@Component({
  selector: 'ss-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public dashboardsProvider: DashboardsProvider
  ) { }

  ngOnInit() {
  }
}
