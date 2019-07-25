import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable, BehaviorSubject } from 'rxjs';
import { Package, PagedQuery, RSQLFilterBuilder, Visible, Dashboard } from '@skysmack/framework';
import { map, debounceTime } from 'rxjs/operators';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'ss-lodging-reservations-dashboard',
  templateUrl: './lodging-reservations-dashboard.component.html',
  styleUrls: ['./lodging-reservations-dashboard.component.scss']
})
export class LodgingReservationsDashboardComponent implements OnInit, Visible {
  @Input() dashboard: Dashboard;
  public packagePath: string;
  public package$: Observable<Package>;
  public arrivalsCount$: Observable<number>;

  constructor(
    public actions: NgLodgingReservationsActions,
    public store: NgLodgingReservationsStore,
    public skysmackStore: NgSkysmackStore
  ) { }

  ngOnInit() {
    this.show();

    this.getArrivalsCount();
    this.package$ = this.skysmackStore.getCurrentPackage(this.packagePath).pipe(map(x => x._package));
  }


  private getArrivalsCount() {
    const pagedQuery = new PagedQuery();
    pagedQuery.rsqlFilter = new RSQLFilterBuilder();
    pagedQuery.rsqlFilter.column('status').like(LodgingReservation.statusEnum.Reserved).and().column('checkIn').lessThanOrEqualTo(moment().toDate());
    this.actions.getPaged(this.packagePath, pagedQuery);

    this.arrivalsCount$ = this.store.getPages(this.packagePath).pipe(
      map(pages => {
        let arrivalsCount = 0;
        Object.keys(pages).forEach(key => {
          arrivalsCount = pages[key].totalCount;
        })
        return arrivalsCount;
      })
    )
  }

  public show(): void {
    setTimeout(() => {
      this.dashboard.show$.next(true);
    }, 0);
  }

  public render(): void {

  }
}
