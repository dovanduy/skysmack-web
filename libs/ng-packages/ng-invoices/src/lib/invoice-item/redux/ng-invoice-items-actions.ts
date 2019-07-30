import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InvoiceItemsAppState, InvoiceItem, INVOICE_ITEMS_REDUX_KEY, INVOICE_ITEMS_ADDITIONAL_PATHS } from '@skysmack/packages-invoices';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgInvoiceItemsActions extends RecordActionsBase<InvoiceItemsAppState, NgRedux<InvoiceItemsAppState>> {
    constructor(protected store: NgRedux<InvoiceItemsAppState>) { super(store, INVOICE_ITEMS_REDUX_KEY, INVOICE_ITEMS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<InvoiceItem, number>): StrIndex<string> {
        return {
            description: record.object.description
        };
    }
}
