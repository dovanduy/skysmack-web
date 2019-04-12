import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { map, filter, take, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { LocalObject, toLocalObject, Package, hasValue, StrIndex, safeUndefinedTo } from '@skysmack/framework';
import { Skysmack, SkysmackAppState } from '@skysmack/packages-skysmack-core';
import { PackageLoader } from '../packages/package-loader';
import { LoadedPackage } from '../packages/loaded-package';
import { Oauth2Type } from '@skysmack/packages-oauth2';
import { IdentitiesType } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgSkysmackStore {
    public stateKey = 'skysmack';

    private editorItem: BehaviorSubject<LocalObject<any, any>>;

    constructor(protected ngRedux: NgRedux<SkysmackAppState>) { }

    public setEditorItem(value: LocalObject<any, any>): void {
        this.editorItem = new BehaviorSubject(value);
    }

    public getEditorItem(clear?: boolean): Observable<LocalObject<any, any>> {
        const copy = this.editorItem;
        if (clear) {
            this.editorItem = undefined;
        }
        return copy ? copy : of(undefined).pipe(take(1));
    }

    public getHydrated(): Observable<boolean> {
        return this.ngRedux.select((state: any) => state.hydrated.hydrated);
    }

    public getSkysmack(): Observable<Skysmack> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack.skysmack).pipe(hasValue());
    }

    public getPackages(): Observable<LocalObject<Package, string>[]> {
        return this.getSkysmack().pipe(
            map(skysmack => skysmack.packages.map(_package => toLocalObject(_package, 'path')))
        );
    }

    public getLoadedPackages(): Observable<LoadedPackage[]> {
        return this.getSkysmack().pipe(
            map(skysmack => skysmack.packages.map(_package => PackageLoader.toLoadedPackage(_package)))
        );
    }

    public getSkysmackLoaded(): Observable<boolean> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack.tenantLoaded);
    }

    public getCurrentPackage(packagePath: string): Observable<LoadedPackage> {
        return this.getSkysmack().pipe(
            map(skysmack => skysmack.packages),
            map(packages => {
                const _package = packages.find(pck => pck.path === packagePath);
                return _package ? PackageLoader.toLoadedPackage(_package) : new LoadedPackage(null, null);
            })
        );
    }

    public getAuthenticationPackages(): Observable<Package[]> {
        return this.getSkysmack().pipe(
            map(skysmack => skysmack.packages.filter(_package => _package.type === Oauth2Type.id))
        );
    }

    public getIdentityPackages(): Observable<Package[]> {
        return this.getSkysmack().pipe(
            map(skysmack => skysmack.packages.filter(_package => _package.type === IdentitiesType.id))
        );
    }

    public getPermissions(packagePath): Observable<string[]> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack).pipe(
            map(skysmack => skysmack.permissions),
            map(permissions => permissions[packagePath]),
            safeUndefinedTo('object'),
        );
    }

    public getAvailablePermissions(packagePath): Observable<StrIndex<string>> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack).pipe(
            map(skysmack => skysmack.availablePermissions),
            map(availablePermissions => availablePermissions[packagePath]),
            safeUndefinedTo('object'),
        );
    }
}
