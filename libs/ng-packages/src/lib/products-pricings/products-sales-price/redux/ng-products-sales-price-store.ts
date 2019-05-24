import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductsSalesPrice, ProductsSalesPriceAppState, PRODUCTS_SALES_PRICE_REDUCER_KEY } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { Observable } from 'rxjs';
import { LocalObject, DependencyOptions } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceStore extends NgRecordStore<ProductsSalesPriceAppState, ProductsSalesPrice, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'record',
            relationIdSelector: 'recordId',
            stateSelector: 'products'
        })
    ];
    
    constructor(
        protected ngRedux: NgRedux<ProductsSalesPriceAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PRODUCTS_SALES_PRICE_REDUCER_KEY); }
    
    public get(packagePath: string): Observable<LocalObject<ProductsSalesPrice, number>[]> {
        return this.getWithDependencies(packagePath, this.deps, [0]);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<ProductsSalesPrice, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps, [0]);
    }
}
