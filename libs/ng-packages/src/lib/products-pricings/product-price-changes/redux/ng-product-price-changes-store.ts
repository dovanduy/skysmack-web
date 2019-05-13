import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductPriceChange, ProductPriceChangesAppState } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesStore extends NgRecordStore<ProductPriceChangesAppState, ProductPriceChange, number> {
    constructor(
        protected ngRedux: NgRedux<ProductPriceChangesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'productPriceChanges'); }
}
