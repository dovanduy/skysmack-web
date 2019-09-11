import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { TerminalPaymentReceiptsAppState, TerminalPaymentReceipt, TERMINAL_PAYMENT_RECEIPTS_REDUCER_KEY } from '@skysmack/packages-terminal-payments';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentReceiptsStore extends NgRecordStore<TerminalPaymentReceiptsAppState, TerminalPaymentReceipt, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'invoicePayment',
            relationIdSelector: 'invoicePaymentId',
            stateSelector: 'invoicePayments',
            dependencyIndexes: [1]
        })
    ];

    constructor(
        protected ngRedux: NgRedux<TerminalPaymentReceiptsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, TERMINAL_PAYMENT_RECEIPTS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<TerminalPaymentReceipt, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<TerminalPaymentReceipt, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
    