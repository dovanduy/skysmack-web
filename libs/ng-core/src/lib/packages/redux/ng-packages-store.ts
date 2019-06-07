import { Injectable } from '@angular/core';
import { PackagesAppState, PACKAGES_REDUCER_KEY } from '@skysmack/packages-skysmack-core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { LocalObject, Package, safeUndefinedTo, AvailablePackage, dictionaryToArray } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '../../skysmack/redux/ng-skysmack-store';

@Injectable({ providedIn: 'root' })
export class NgPackagesStore extends NgRecordStore<PackagesAppState, Package, string> {
    constructor(
        protected ngRedux: NgRedux<PackagesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PACKAGES_REDUCER_KEY); }

    public getAvailablePackages(): Observable<LocalObject<AvailablePackage, string>[]> {
        return this.getState<PackagesAppState>().pipe(
            map(state => state.packages.availablePackages),
            safeUndefinedTo('object'),
            dictionaryToArray(),
        );
    }
}
