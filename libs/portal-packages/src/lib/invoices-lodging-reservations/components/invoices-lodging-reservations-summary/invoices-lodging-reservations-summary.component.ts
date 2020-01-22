import { Component } from '@angular/core';
import { LocalObject } from '@skysmack/framework';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { Router } from '@angular/router';
import { NgInvoicesActions, NgInvoicesStore } from '@skysmack/ng-invoices';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Invoice } from '@skysmack/packages-invoices';
import { Observable } from 'rxjs';
import { SummaryBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-invoices-lodging-reservations-summary',
  templateUrl: './invoices-lodging-reservations-summary.component.html'
})
export class InvoicesLodgingReservationsSummaryComponent extends SummaryBaseComponent<number> {

  public invoices$: Observable<LocalObject<Invoice, number>[]>;
  public invoicesPackagePath$: Observable<string>;

  constructor(
    protected router: Router,
    protected skysmackStore: NgSkysmackStore,
    protected store: NgInvoicesStore,
    protected actions: NgInvoicesActions,
    protected reservationActions: NgLodgingReservationsActions,
    protected reservationStore: NgLodgingReservationsStore
  ) {
    super(router, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.invoicesPackagePath$ = this.getDependencyPackagePath([0]);
    const invoiceIds$ = this.getExtendedDataIds(this.invoicesPackagePath$, this.reservationStore);
    this.requestRecords(this.invoicesPackagePath$, invoiceIds$, this.actions);
    this.invoices$ = this.getRecords(this.invoicesPackagePath$, invoiceIds$, this.store);
  }
}


