import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Product, ProductsAppState, PRODUCTS_REDUCER_KEY } from '@skysmack/packages-products';
import { NgRecordStore } from '@skysmack/ng-framework';
import { LocalObject, DependencyOptions } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgProductsStore extends NgRecordStore<ProductsAppState, Product, number> {

    private deps = [
        new DependencyOptions({
            relationSelector: 'productType',
            relationIdSelector: 'productTypeId',
            stateSelector: 'productTypes'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<ProductsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PRODUCTS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<Product, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<Product, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
