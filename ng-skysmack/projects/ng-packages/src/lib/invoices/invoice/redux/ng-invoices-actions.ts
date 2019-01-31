import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InvoicesAppState } from '@skysmack/packages-invoices';

@Injectable({ providedIn: 'root' })
export class NgInvoicesActions extends DocumentRecordActionsBase<InvoicesAppState, NgRedux<InvoicesAppState>> {
    constructor(protected store: NgRedux<InvoicesAppState>) { super(store, 'INVOICES_', []); }
}
