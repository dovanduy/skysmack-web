import { Component, OnInit } from '@angular/core';
import { SummaryBaseComponent } from '@skysmack/portal-fields';
import { Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgInvoicesStore, NgInvoicesActions } from '@skysmack/ng-invoices';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';

@Component({
  selector: 'ss-lodging-reservations-invoices-summary',
  templateUrl: './lodging-reservations-invoices-summary.component.html'
})
export class LodgingReservationsInvoicesSummaryComponent extends SummaryBaseComponent<number> implements OnInit {

  public reservations$: Observable<LocalObject<LodgingReservation, number>[]>;
  public reservationsPackagePath$: Observable<string>;

  constructor(
    protected router: Router,
    protected skysmackStore: NgSkysmackStore,
    protected store: NgLodgingReservationsStore,
    protected actions: NgLodgingReservationsActions,
    protected invoicesActions: NgInvoicesActions,
    protected invoicesStore: NgInvoicesStore
  ) {
    super(router, skysmackStore)
  }

  ngOnInit() {
    super.ngOnInit();
    this.reservationsPackagePath$ = this.getDependencyPackagePath([1]);
    const reservationIds$ = this.getExtendedDataIds(this.reservationsPackagePath$, this.invoicesStore);
    this.requestRecords(this.reservationsPackagePath$, reservationIds$, this.actions);
    this.reservations$ = this.getRecords(this.reservationsPackagePath$, reservationIds$, this.store);
  }
}
