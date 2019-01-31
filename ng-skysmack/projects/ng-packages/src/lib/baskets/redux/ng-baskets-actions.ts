import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { BasketsAppState } from '@skysmack/packages-baskets';

@Injectable({ providedIn: 'root' })
export class NgBasketsActions extends DocumentRecordActionsBase<BasketsAppState, NgRedux<BasketsAppState>> {
    constructor(protected store: NgRedux<BasketsAppState>) { super(store, 'BASKETS_', []); }
}
