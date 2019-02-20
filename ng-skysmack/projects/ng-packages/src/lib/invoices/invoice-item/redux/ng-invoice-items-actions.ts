import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InvoiceItemsAppState, InvoiceItem } from '@skysmack/packages-invoices';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsActions extends DocumentRecordActionsBase<InvoiceItemsAppState, NgRedux<InvoiceItemsAppState>> {
    constructor(protected store: NgRedux<InvoiceItemsAppState>) { super(store, 'INVOICE_ITEMS_', ['items']); }

    protected getMessageParams(record: LocalObject<InvoiceItem, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
