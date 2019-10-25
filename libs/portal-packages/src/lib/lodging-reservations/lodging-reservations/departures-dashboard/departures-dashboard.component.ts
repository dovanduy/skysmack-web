import { Component, OnInit } from '@angular/core';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { PagedQuery, RSQLFilterBuilder } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import * as _moment from 'moment';
import { DashboardBase } from '@skysmack/portal-fields';
const moment = _moment;

@Component({
  selector: 'ss-departures-dashboard',
  templateUrl: './departures-dashboard.component.html',
  styleUrls: ['./departures-dashboard.component.scss']
})
export class DeparturesDashboardComponent extends DashboardBase implements OnInit {
  public elevation = 0;
  public departuresCount$: Observable<number>;

  constructor(
    public actions: NgLodgingReservationsActions,
    public store: NgLodgingReservationsStore,
    public skysmackStore: NgSkysmackStore
  ) { super(skysmackStore); }

  ngOnInit() {
    super.ngOnInit();
    this.getDeparturesCount();
    this.show();
    this.render();
  }

  private getDeparturesCount() {
    const pagedQuery = new PagedQuery();
    pagedQuery.rsqlFilter = new RSQLFilterBuilder();
    pagedQuery.rsqlFilter.column('status').like(LodgingReservation.statusEnum.InStay).and().column('checkOut').lessThan(moment({h:0, m:0, s:0, ms:0}).add(1,'days').toDate());
    this.actions.getPaged(this.packagePath, pagedQuery);

    this.departuresCount$ = this.store.getPages(this.packagePath).pipe(
      map(pages => {
        return pages[pagedQuery.rsqlFilter.toList().build()].totalCount;
      })
    );
  }

  public show(): void {
    setTimeout(() => {
      this.subscriptionHandler.register(this.departuresCount$.pipe(
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
