import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductPriceChange, ProductPriceChangesAppState, PRODUCT_PRICE_CHANGES_REDUCER_KEY } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';


@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesStore extends NgRecordStore<ProductPriceChangesAppState, ProductPriceChange, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'product',
            relationIdSelector: 'productId',
            stateSelector: 'products',
            dependencyIndexes: [0]
        })
    ];

    constructor(
        protected ngRedux: NgRedux<ProductPriceChangesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PRODUCT_PRICE_CHANGES_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<ProductPriceChange, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<ProductPriceChange, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
