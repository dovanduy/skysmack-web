import { NgRedux } from '@angular-redux/store';
import { map, take } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { LocalObject, toLocalObject, Package, hasValue, StrIndex, safeUndefinedTo, defined, OfflineState, safeHasValue } from '@skysmack/framework';
import { Skysmack, SkysmackAppState, SkysmackRequestStatus } from '@skysmack/packages-skysmack-core';
import { LoadedPackage } from '../packages/loaded-package';
import { PackageLoader } from '../packages/package-loader';

export class SkysmackStore {
    public stateKey = 'skysmack';

    private editorItem: BehaviorSubject<LocalObject<any, any>>;

    constructor(public ngRedux: NgRedux<SkysmackAppState>) { }

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

    public getOffline(): Observable<OfflineState> {
        return this.ngRedux.select((state: SkysmackAppState) => state.offline);
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

    public getAccessiblePackages(): Observable<LocalObject<Package, string>[]> {
        return this.getPackages().pipe(
            map(packages => packages.filter(_package => _package.object.access))
        );
    }

    public getLoadedPackages(): Observable<LoadedPackage[]> {
        return this.getSkysmack().pipe(
            map(skysmack => skysmack.packages.map(_package => PackageLoader.toLoadedPackage(_package)))
        );
    }

    public getSkysmackLoaded(): Observable<SkysmackRequestStatus> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack.requestStatus);
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

    public getPackageByTypeId(typeId: string): Observable<Package[]> {
        return this.getSkysmack().pipe(
            map(skysmack => skysmack.packages.filter(_package => _package.type === typeId)),
            safeHasValue()
        );
    }

    public getPermissions(packagePath): Observable<string[]> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack).pipe(
            map(skysmack => skysmack.permissions),
            map(permissions => permissions[packagePath]),
            safeUndefinedTo('array'),
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
