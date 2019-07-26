import { Component, OnInit } from '@angular/core';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable, interval } from 'rxjs';
import { PagedQuery, RSQLFilterBuilder } from '@skysmack/framework';
import { map, tap } from 'rxjs/operators';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import * as _moment from 'moment';
import { DashboardBase } from '@skysmack/portal-fields';
const moment = _moment;

@Component({
  selector: 'ss-lodging-reservations-dashboard',
  templateUrl: './lodging-reservations-dashboard.component.html',
  styleUrls: ['./lodging-reservations-dashboard.component.scss']
})
export class LodgingReservationsDashboardComponent extends DashboardBase implements OnInit {
  public arrivalsCount$: Observable<number>;

  constructor(
    public actions: NgLodgingReservationsActions,
    public store: NgLodgingReservationsStore,
    public skysmackStore: NgSkysmackStore
  ) { super(skysmackStore); }

  ngOnInit() {
    super.ngOnInit();
    this.getArrivalsCount();
    this.show();
    this.render();
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
    );
  }

  public show(): void {
    setTimeout(() => {
      this.subscriptionHandler.register(this.arrivalsCount$.pipe(
        map(count => count ? this.dashboard.show$.next(true) : this.dashboard.show$.next(false))
      ).subscribe());
    }, 0);
  }

  public render(): void {
    setTimeout(() => {
      this.dashboard.render$.next(true);
    }, 0);
  }
}
