import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Invoice, InvoicesAppState, INVOICES_REDUCER_KEY } from '@skysmack/packages-invoices';
import { NgRecordStore } from '@skysmack/ng-framework';
import { LocalObject, DependencyOptions } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgInvoicesStore extends NgRecordStore<InvoicesAppState, Invoice, number> {

    private deps = [
        new DependencyOptions({
            relationSelector: 'invoiceItems',
            relationIdSelector: 'inventoryId',
            stateSelector: 'invoiceItems'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<InvoicesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, INVOICES_REDUCER_KEY); }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<Invoice, number>> {
        return this.getSingleWithDependencies(packagePath, id, this.deps);
    }
}
