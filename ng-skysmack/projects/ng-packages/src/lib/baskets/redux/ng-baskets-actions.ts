import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { BasketsAppState, Basket } from '@skysmack/packages-baskets';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgBasketsActions extends DocumentRecordActionsBase<BasketsAppState, NgRedux<BasketsAppState>> {
    constructor(protected store: NgRedux<BasketsAppState>) { super(store, 'BASKETS_', []); }

    protected getMessageParams(record: LocalObject<Basket, number>): StrIndex<string> {
        return {
            currencyCode: record.object.currencyCode
        };
    }
}
