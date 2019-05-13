import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgProductTypesStore extends NgRecordStore<ProductTypesAppState, ProductType, number> {
    constructor(
        protected ngRedux: NgRedux<ProductTypesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'productTypes'); }
}
