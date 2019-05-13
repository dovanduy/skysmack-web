import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-redux';
import { InvoicesCashPaymentsAppState, CashPayment } from '@skysmack/packages-invoices-cash-payments';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { Observable } from 'rxjs';
import { LocalObject, DependencyOptions } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsStore extends NgRecordStore<InvoicesCashPaymentsAppState, CashPayment, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'invoice',
            relationIdSelector: 'invoiceId',
            stateSelector: 'invoices'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<InvoicesCashPaymentsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'invoicesCashPayments'); }


    public get(packagePath: string): Observable<LocalObject<CashPayment, number>[]> {
        return this.getWithDependencies(packagePath, this.deps, [0]);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<CashPayment, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps, [0]);
    }
}
