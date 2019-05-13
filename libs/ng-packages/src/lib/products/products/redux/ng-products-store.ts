import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Product, ProductsAppState } from '@skysmack/packages-products';
import { NgRecordStore } from '@skysmack/ng-redux';
import { LocalObject, DependencyOptions } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgProductsStore extends NgRecordStore<ProductsAppState, Product, number> {
    constructor(
        protected ngRedux: NgRedux<ProductsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'products'); }

    public get(packagePath: string): Observable<LocalObject<Product, number>[]> {
        return this.getWithDependencies(packagePath, new DependencyOptions({
            relationSelector: 'productType',
            relationIdSelector: 'productTypeId',
            stateSelector: 'productTypes'
        }));
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<Product, number>> {
        return this.getSingleWithDependency(packagePath, id, new DependencyOptions({
            relationSelector: 'productType',
            relationIdSelector: 'productTypeId',
            stateSelector: 'productTypes'
        }));
    }
}
