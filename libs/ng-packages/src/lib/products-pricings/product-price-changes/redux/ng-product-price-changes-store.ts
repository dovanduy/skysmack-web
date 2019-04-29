import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductPriceChange, ProductPriceChangesAppState } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesStore extends NgRecordStore<ProductPriceChangesAppState, ProductPriceChange, number> {
    constructor(protected ngRedux: NgRedux<ProductPriceChangesAppState>) { super(ngRedux, 'productPriceChanges'); }
}
