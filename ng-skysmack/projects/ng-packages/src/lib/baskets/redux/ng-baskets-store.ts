import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Basket, BasketsAppState } from '@skysmack/packages-baskets';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgBasketsStore extends NgDocumentRecordReduxStore<BasketsAppState, Basket, number> {
    constructor(protected ngRedux: NgRedux<BasketsAppState>) { super(ngRedux, 'baskets'); }
}
