import { Injectable } from '@angular/core';
import { PackagesAppState } from '@skysmack/packages';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { LocalObject, Package, safeUndefinedTo } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgPackagesStore {

    constructor(
        protected store: NgRedux<PackagesAppState>
    ) { }

    public get(): Observable<LocalObject<Package>[]> {
        return this.store.select(state => state.packages.localPackages).pipe(safeUndefinedTo('array'));
    }

    public getSingle(path: string): Observable<LocalObject<Package>> {
        return this.store.select(state => state.packages.localPackages).pipe(map(packages => packages.find(_package => _package.object.path === path)), safeUndefinedTo('array'));
    }

    public getAvailablePackages(): Observable<LocalObject<Package>[]> {
        return this.store.select(state => state.packages.availablePackages).pipe(safeUndefinedTo('array'));
    }
}
