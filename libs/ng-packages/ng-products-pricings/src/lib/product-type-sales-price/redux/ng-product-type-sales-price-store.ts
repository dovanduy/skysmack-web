import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductTypeSalesPrice, ProductTypeSalesPriceAppState, PRODUCT_TYPE_SALES_PRICE_REDUCER_KEY } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { LocalObject, DependencyOptions } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';


@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceStore extends NgRecordStore<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'record',
            relationIdSelector: 'recordId',
            stateSelector: 'productTypes'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<ProductTypeSalesPriceAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PRODUCT_TYPE_SALES_PRICE_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<ProductTypeSalesPrice, number>[]> {
        return this.getWithDependencies(packagePath, this.deps, [0]);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<ProductTypeSalesPrice, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps, [0]);
    }
}
