import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Product, ProductsAppState, ProductType, ProductTypesState } from '@skysmack/packages-products';
import { NgRecordStore } from '@skysmack/ng-redux';
import { LocalObject, hasValue, safeUndefinedTo, dictionaryToArray } from '@skysmack/framework';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgProductsStore extends NgRecordStore<ProductsAppState, Product, number> {
    constructor(protected ngRedux: NgRedux<ProductsAppState>) { super(ngRedux, 'products'); }

    public get(packagePath: string): Observable<LocalObject<Product, number>[]> {
        return combineLatest(super.get(packagePath), this.getProductTypes(packagePath)).pipe(
            map(values => {
                const products = values[0];
                const productTypes = values[1];
                for (let index = 0; index < products.length; index++) {
                    const product = products[index];
                    if (product.object.productTypeId && product.object.productTypeId > 0) {
                        product.object.productType = productTypes.find(productType => productType.object.id === product.object.productTypeId);
                    }
                }
                return products;
            })
        );
    }

    private getProductTypes(packagePath: string): Observable<LocalObject<ProductType, number>[]> {
        return this.getProductTypeState().pipe(
            map(state => state.localRecords[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<ProductType, number>>(),
            hasValue()
        );
    }

    protected getProductTypeState(): Observable<ProductTypesState> {
        return this.store.select(state => state['productTypes']);
    }
}
