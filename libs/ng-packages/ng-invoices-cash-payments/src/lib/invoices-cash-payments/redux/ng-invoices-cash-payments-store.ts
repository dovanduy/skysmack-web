import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { InvoicesCashPaymentsAppState, CashPayment, INVOICES_CASH_PAYMENTS_REDUCER_KEY } from '@skysmack/packages-invoices-cash-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { LocalObject, DependencyOptions } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsStore extends NgRecordStore<InvoicesCashPaymentsAppState, CashPayment, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'invoice',
            relationIdSelector: 'invoiceId',
            stateSelector: 'invoices',
            dependencyIndexes: [0]
        })
    ];

    constructor(
        protected ngRedux: NgRedux<InvoicesCashPaymentsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, INVOICES_CASH_PAYMENTS_REDUCER_KEY); }


    public get(packagePath: string): Observable<LocalObject<CashPayment, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<CashPayment, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
