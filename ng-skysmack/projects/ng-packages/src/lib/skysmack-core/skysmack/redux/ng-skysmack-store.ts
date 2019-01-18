import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalObject, toLocalObject, flatten, safeHasValue, Package, defined } from '@skysmack/framework';
import { Skysmack, SkysmackAppState } from '@skysmack/packages-skysmack-core';
import { PackageLoader } from '../packages/package-loader';
import { LoadedPackage } from '../packages/loaded-package';
import { Oauth2Type } from '@skysmack/packages-oauth2';

@Injectable({ providedIn: 'root' })
export class NgSkysmackStore {
    public stateKey = 'skysmack';
    constructor(protected ngRedux: NgRedux<SkysmackAppState>) { }

    public getHydrated(): Observable<boolean> {
        return this.ngRedux.select((state: any) => state.hydrated.hydrated);
    }

    public getSkysmack(): Observable<Skysmack> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack.skysmack);
    }

    public getPackages(): Observable<LocalObject<Package, string>[]> {
        return this.getSkysmack().pipe(
            map(skysmack => skysmack.packages.map(_package => toLocalObject(_package)))
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
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack.skysmack.packages).pipe(flatten<Package>(), filter(_package => _package.path === packagePath), map(_package => PackageLoader.toLoadedPackage(_package)), safeHasValue());
    }

    /**
     * Gets the FIRST package described in the current packages dependencies array.
     * @param packagePath The current package's path.
     */
    public getDependencyPackage(packagePath: string): Observable<LoadedPackage> {
        return this.getCurrentPackage(packagePath).pipe(
            map(loadedPackage => loadedPackage._package.dependencies[0]),
            defined(),
            switchMap(dependencyPackagePath => this.getCurrentPackage(dependencyPackagePath))
        );
    }

    public getAuthenticationPackages(): Observable<Package[]> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack.skysmack.packages.filter(_package => _package.type === Oauth2Type.id));
    }
}
