import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductTypePriceChange, ProductTypePriceChangesAppState } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY } from '@skysmack/packages-products-pricings';


@Injectable({ providedIn: 'root' })
export class NgProductTypePriceChangesStore extends NgRecordStore<ProductTypePriceChangesAppState, ProductTypePriceChange, number> {
    constructor(protected ngRedux: NgRedux<ProductTypePriceChangesAppState>) { super(ngRedux, PRODUCT_TYPE_PRICE_CHANGES_AREA_KEY); }
}
