import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { BasketsAppState, Basket, BASKETS_REDUX_KEY } from '@skysmack/packages-baskets';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgBasketsActions extends RecordActionsBase<BasketsAppState, NgRedux<BasketsAppState>> {
    constructor(protected store: NgRedux<BasketsAppState>) { super(store, BASKETS_REDUX_KEY, []); }

    public getMessageParams(record: LocalObject<Basket, number>): StrIndex<string> {
        return {
            currencyCode: record.object.currencyCode
        };
    }
}
