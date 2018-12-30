import { Injectable } from '@angular/core';
import { PackagesAppState } from '@skysmack/packages';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { LocalObject, Package, safeUndefinedTo, AvailablePackage, dictionaryToArray, hasValue } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgPackagesStore {

    constructor(
        protected store: NgRedux<PackagesAppState>
    ) { }

    public get(): Observable<LocalObject<Package, string>[]> {
        return this.store.select(state => state.packages.localPackages).pipe(
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<Package, string>>()
        );
    }

    public getSingle(path: string): Observable<LocalObject<Package, string>> {
        return this.get().pipe(
            map(packages => packages.find(_package => _package.object.path === path)),
            hasValue()
        );
    }

    public getAvailablePackages(): Observable<LocalObject<AvailablePackage, string>[]> {
        return this.store.select(state => state.packages.availablePackages).pipe(
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<AvailablePackage, string>>(),
        );
    }
}
