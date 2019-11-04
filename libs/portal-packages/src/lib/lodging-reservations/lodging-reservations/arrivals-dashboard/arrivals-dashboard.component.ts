import { Component, OnInit } from '@angular/core';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { PagedQuery, RSQLFilterBuilder, SubscriptionHandler } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import * as _moment from 'moment';
import { DashboardBase } from '@skysmack/portal-fields';
const moment = _moment;

@Component({
  selector: 'ss-arrivals-dashboard',
  templateUrl: './arrivals-dashboard.component.html',
  styleUrls: ['./arrivals-dashboard.component.scss']
})
export class ArrivalsDashboardComponent extends DashboardBase implements OnInit {
  public elevation = 0;
  public arrivalsCount$: Observable<number>;
  protected subscriptionHandler = new SubscriptionHandler();

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

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  private getArrivalsCount() {
    const pagedQuery = new PagedQuery();
    pagedQuery.rsqlFilter = new RSQLFilterBuilder();
    pagedQuery.rsqlFilter.column('status').like(LodgingReservation.statusEnum.Reserved).and().column('checkIn').lessThanOrEqualTo(moment({h:0, m:0, s:0, ms:0}).add(1,'days').toDate());
    this.actions.getPaged(this.packagePath, pagedQuery);

    this.arrivalsCount$ = this.store.getPages(this.packagePath).pipe(
      map(pages => {
        return pages[pagedQuery.rsqlFilter.toList().build()].totalCount;
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

  public changeStyle($event) {
    this.elevation = $event.type == 'mouseover' ? 4 : 0;
  }
}
