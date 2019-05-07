import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Product, ProductsAppState } from '@skysmack/packages-products';
import { NgRecordStore } from '@skysmack/ng-redux';
import { LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgProductsStore extends NgRecordStore<ProductsAppState, Product, number> {
    constructor(protected ngRedux: NgRedux<ProductsAppState>) { super(ngRedux, 'products'); }

    public get(packagePath: string): Observable<LocalObject<Product, number>[]> {
        return this.getWithDependencies(packagePath, 'productType', 'productTypeId', 'productTypes');
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<Product, number>> {
        return this.getSingleWithDependency(packagePath, id, 'productType', 'productTypeId', 'productTypes');
    }
}
