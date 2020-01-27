import { Component, OnInit } from '@angular/core';
import { SummaryBaseComponent } from '@skysmack/portal-fields';
import { Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgPersonsStore, NgPersonsActions } from '@skysmack/ng-persons';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { LodgingReservation } from 'libs/packages/lodging-reservations/src';
import { LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-lodging-reservations-persons-summary',
  templateUrl: './lodging-reservations-persons-summary.component.html'
})
export class LodgingReservationsPersonsSummaryComponent extends SummaryBaseComponent<number> implements OnInit {

  public reservations$: Observable<LocalObject<LodgingReservation, number>[]>;
  public reservationsPackagePath$: Observable<string>;

  constructor(
    protected router: Router,
    protected skysmackStore: NgSkysmackStore,
    protected store: NgLodgingReservationsStore,
    protected actions: NgLodgingReservationsActions,
    protected personsActions: NgPersonsActions,
    protected personsStore: NgPersonsStore
  ) {
    super(router, skysmackStore)
  }

  ngOnInit() {
    super.ngOnInit();
    this.reservationsPackagePath$ = this.getDependencyPackagePath([1]);
    const reservationIds$ = this.getExtendedDataIds(this.reservationsPackagePath$, this.personsStore);
    this.requestRecords(this.reservationsPackagePath$, reservationIds$, this.actions);
    this.reservations$ = this.getRecords(this.reservationsPackagePath$, reservationIds$, this.store);
  }
}
