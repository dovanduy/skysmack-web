import { Component, OnInit } from '@angular/core';
import { NgDashboardProviders } from '@skysmack/ng-framework';
import { Dashboard } from '@skysmack/framework';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ss-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public dashboards$: Observable<Dashboard[]>;

  constructor(
    public dashboardProviders: NgDashboardProviders
  ) { }

  ngOnInit() {
    this.dashboards$ = this.dashboardProviders.providers$.pipe(
      switchMap(providers => combineLatest(
        providers.map(provider => provider.getDashboards())
      )),
      map(x => x.reduce((a, b) => a.concat(b), []))
    );
  }
}
