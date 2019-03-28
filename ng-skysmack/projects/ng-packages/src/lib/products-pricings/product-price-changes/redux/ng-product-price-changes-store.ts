import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductPriceChange, ProductPriceChangesAppState } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { PRODUCT_PRICE_CHANGES_AREA_KEY } from '@skysmack/packages-products-pricings';


@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesStore extends NgRecordStore<ProductPriceChangesAppState, ProductPriceChange, number> {
    constructor(protected ngRedux: NgRedux<ProductPriceChangesAppState>) { super(ngRedux, PRODUCT_PRICE_CHANGES_AREA_KEY); }
}
