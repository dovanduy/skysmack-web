import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ReceiptsAppState, Receipt, RECEIPTS_REDUX_KEY, RECEIPTS_ADDITIONAL_PATHS } from '@skysmack/packages-terminal-payments';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgReceiptsActions extends RecordActionsBase<ReceiptsAppState, NgRedux<ReceiptsAppState>> {
    constructor(protected store: NgRedux<ReceiptsAppState>) { super(store, RECEIPTS_REDUX_KEY, RECEIPTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Receipt, string>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}
