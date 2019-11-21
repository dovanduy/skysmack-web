import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { PassCodesAppState, PASS_CODES_REDUX_KEY, PASS_CODES_ADDITIONAL_PATHS } from '@skysmack/packages-pass-codes';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { PassCode } from '@skysmack/packages-pass-codes';

@Injectable({ providedIn: 'root' })
export class NgPassCodesActions extends RecordActionsBase<PassCodesAppState, NgRedux<PassCodesAppState>> {
    constructor(protected store: NgRedux<PassCodesAppState>) { super(store, PASS_CODES_REDUX_KEY, PASS_CODES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<PassCode, number>): StrIndex<string> {
        return {
            displayName: record.object.displayName
        };
    }
}
