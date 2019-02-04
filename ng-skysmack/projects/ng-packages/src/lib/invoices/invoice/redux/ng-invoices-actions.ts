import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InvoicesAppState, Invoice } from '@skysmack/packages-invoices';
import { LocalObject, NumIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgInvoicesActions extends DocumentRecordActionsBase<InvoicesAppState, NgRedux<InvoicesAppState>> {
    constructor(protected store: NgRedux<InvoicesAppState>) { super(store, 'INVOICES_', []); }

    protected getMessageParams(record: LocalObject<Invoice, number>): NumIndex<string> {
        return {
            0: record.object.currencyCode
        };
    }
}
