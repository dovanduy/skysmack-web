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
  selector: 'ss-in-stay-dashboard',
  templateUrl: './in-stay-dashboard.component.html',
  styleUrls: ['./in-stay-dashboard.component.scss']
})
export class InStayDashboardComponent extends DashboardBase implements OnInit {
  public elevation = 0;
  public inStayCount$: Observable<number>;

  constructor(
    public actions: NgLodgingReservationsActions,
    public store: NgLodgingReservationsStore,
    public skysmackStore: NgSkysmackStore
  ) { super(skysmackStore); }

  ngOnInit() {
    super.ngOnInit();
    this.getInStayCount();
    this.show();
    this.render();
  }

  private getInStayCount() {
    const pagedQuery = new PagedQuery();
    pagedQuery.rsqlFilter = new RSQLFilterBuilder();
    pagedQuery.rsqlFilter.column('status').like(LodgingReservation.statusEnum.InStay);
    this.actions.getPaged(this.packagePath, pagedQuery);

    this.inStayCount$ = this.store.getPages(this.packagePath).pipe(
      map(pages => {
        return pages[pagedQuery.rsqlFilter.toList().build()].totalCount;
      })
    );
  }

  public show(): void {
    setTimeout(() => {
      this.subscriptionHandler.register(this.inStayCount$.pipe(
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
