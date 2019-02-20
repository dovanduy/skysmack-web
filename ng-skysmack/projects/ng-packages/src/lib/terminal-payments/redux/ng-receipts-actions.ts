import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ReceiptsAppState, Receipt } from '@skysmack/packages-terminal-payments';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgReceiptsActions extends DocumentRecordActionsBase<ReceiptsAppState, NgRedux<ReceiptsAppState>> {
    constructor(protected store: NgRedux<ReceiptsAppState>) { super(store, 'RECEIPTS_', ['receipts']); }

    protected getMessageParams(record: LocalObject<Receipt, number>): StrIndex<string> {
        return {
            id: record.object.id.toString()
        };
    }
}
