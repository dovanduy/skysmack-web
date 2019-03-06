import { Injectable } from '@angular/core';
import { PackagesAppState, PackagesState } from '@skysmack/packages-skysmack-core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { LocalObject, Package, safeUndefinedTo, AvailablePackage, dictionaryToArray, hasValue, log, StrIndex, LocalPageTypes } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { EntityStore } from '@skysmack/redux';

@Injectable({ providedIn: 'root' })
export class NgPackagesStore implements EntityStore<Package, string> {

    constructor(
        protected store: NgRedux<PackagesAppState>
    ) { }

    public get(): Observable<LocalObject<Package, string>[]> {
        return this.getState().pipe(
            map(packages => packages.packages),
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

    public getPages(): Observable<StrIndex<LocalPageTypes<string>>> {
        return this.getState().pipe(
            map(state => state.packages),
            hasValue<StrIndex<LocalPageTypes<string>>>()
        );
    }

    public getAvailablePackages(): Observable<LocalObject<AvailablePackage, string>[]> {
        return this.getState().pipe(
            map(packages => packages.availablePackages),
            safeUndefinedTo('object'),
            dictionaryToArray(),
        );
    }

    public getPermissions(packageType: string): Observable<string[]> {
        return this.getAvailablePackages().pipe(
            map(availablePackages => availablePackages.find(availablePackage => availablePackage.object.type === packageType)),
            hasValue(),
            map((availablePackage: LocalObject<AvailablePackage, string>) => availablePackage.object.permissions),
        );
    }

    protected getState(): Observable<PackagesState> {
        return this.store.select(state => state.packages);
    }
}
