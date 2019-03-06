import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InvoicesAppState, Invoice } from '@skysmack/packages-invoices';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgInvoicesActions extends RecordActionsBase<InvoicesAppState, NgRedux<InvoicesAppState>> {
    constructor(protected store: NgRedux<InvoicesAppState>) { super(store, 'INVOICES_', []); }

    public getMessageParams(record: LocalObject<Invoice, number>): StrIndex<string> {
        return {
            currencyCode: record.object.currencyCode.toString()
        };
    }
}
