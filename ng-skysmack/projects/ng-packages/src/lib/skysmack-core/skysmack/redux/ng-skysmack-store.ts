import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalObject, toLocalObject, flatten, safeHasValue, Package } from '@skysmack/framework';
import { Skysmack, SkysmackAppState } from '@skysmack/packages-skysmack-core';
import { PackageLoader } from '../packages/package-loader';
import { LoadedPackage } from '../packages/loaded-package';
import { Oauth2Type } from '@skysmack/packages-oauth2';

@Injectable({ providedIn: 'root' })
export class NgSkysmackStore {
    public stateKey = 'skysmack';
    constructor(protected ngRedux: NgRedux<SkysmackAppState>) { }

    public getHydrated(): Observable<boolean> {
        // TODO: How to get hydrated state here, when it is defined in the web project?
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

    public getCurrentPackage(path): Observable<LoadedPackage> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack.skysmack.packages).pipe(flatten<Package>(), filter(_package => _package.path === path), map(_package => PackageLoader.toLoadedPackage(_package)), safeHasValue());
    }

    // TODO: What if it isn't the oauth 2 package? Does other packages have the same type id?
    public getAuthenticationPackages(): Observable<Package[]> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack.skysmack.packages.filter(_package => _package.type === Oauth2Type.id));
    }
}
