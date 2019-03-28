import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Basket, BasketsAppState, BASKETS_AREA_KEY } from '@skysmack/packages-baskets';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgBasketsStore extends NgRecordStore<BasketsAppState, Basket, number> {
    constructor(protected ngRedux: NgRedux<BasketsAppState>) { super(ngRedux, BASKETS_AREA_KEY); }
}
