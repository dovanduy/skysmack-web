import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Summary, SubscriptionHandler, RSQLFilterBuilder, PagedQuery, LocalObject } from '@skysmack/framework';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { tap, take, map, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgPersonsActions, NgPersonsStore } from '@skysmack/ng-persons';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { Person } from '@skysmack/packages-persons';
import { Observable } from 'rxjs';
import { SummaryBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-persons-lodging-reservations-summary',
  templateUrl: './persons-lodging-reservations-summary.component.html'
})
export class PersonsLodgingReservationsSummaryComponent extends SummaryBaseComponent<number> {

  public persons$: Observable<LocalObject<Person, number>[]>;
  public personsPackagePath$: Observable<string>;

  constructor(
    protected router: Router,
    protected skysmackStore: NgSkysmackStore,
    protected store: NgPersonsStore,
    protected actions: NgPersonsActions,
    protected reservationActions: NgLodgingReservationsActions,
    protected reservationStore: NgLodgingReservationsStore
  ) {
    super(router, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    const personIds$ = this.getExtendedDataIds(this.reservationStore);
    this.personsPackagePath$ = this.getDependencyPackagePath([0]);
    this.requestRecords(this.personsPackagePath$, personIds$, this.actions);
    this.persons$ = this.getRecords(this.personsPackagePath$, personIds$, this.store);
  }
}


