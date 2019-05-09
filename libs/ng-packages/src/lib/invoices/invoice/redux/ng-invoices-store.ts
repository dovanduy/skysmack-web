import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Invoice, InvoicesAppState } from '@skysmack/packages-invoices';
import { NgRecordStore } from '@skysmack/ng-redux';
import { LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgInvoicesStore extends NgRecordStore<InvoicesAppState, Invoice, number> {
    constructor(protected ngRedux: NgRedux<InvoicesAppState>) { super(ngRedux, 'invoices'); }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<Invoice, number>> {
        return this.getSingleWithDependencies(packagePath, id, 'invoiceItems', 'inventoryId', 'invoiceItems');
    }
}
