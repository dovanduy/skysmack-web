import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ReceiptsAppState } from '@skysmack/packages-terminal-payments';

@Injectable({ providedIn: 'root' })
export class NgReceiptsActions extends DocumentRecordActionsBase<ReceiptsAppState, NgRedux<ReceiptsAppState>> {
    constructor(protected store: NgRedux<ReceiptsAppState>) { super(store, 'RECEIPTS_', ['types']); }
}
