import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalObject, toLocalObject, defined, flatten, safeHasValue } from '@skysmack/framework';
import { CurrentTenantViewModel, InstalledPackageViewModel } from '@skysmack/packages-skysmack';
import { PackageLoader, Package } from 'lib/ng-packages/packages';

@Injectable({
    providedIn: 'root',
})
export class NgSkysmackRedux {
    public stateKey = 'skysmack';
    constructor(protected ngRedux: NgRedux<any>) { }

    public getCurrentTenant(): Observable<CurrentTenantViewModel> {
        return this.ngRedux.select((state: any) => state.skysmack.currentTenant);
    }

    public getAllPackages(): Observable<LocalObject<InstalledPackageViewModel>[]> {
        return this.getCurrentTenant().pipe(
            map(currentTenant => [
                ...currentTenant.packages,
                ...currentTenant.features,
                ...currentTenant.adaptors
            ]),
            map(packages => packages.map(_package => toLocalObject(_package)))
        );
    }

    public getCurrentTenantLoaded(): Observable<boolean> {
        return this.ngRedux.select((state: any) => state.skysmack.tenantLoaded);
    }

    public getCurrentPackage(path): Observable<Package> {
        return this.ngRedux.select((state: any) => state.skysmack.currentTenant.packages).pipe(flatten(), filter(installedPackage => installedPackage.url === path), map(_package => PackageLoader.toPackage(_package)), safeHasValue());
    }

    public getPackages(): Observable<Package[]> {
        return this.ngRedux.select((state: any) => state.skysmack.currentTenant.packages).pipe(defined(), map(packages => packages.map(_package => PackageLoader.toPackage(_package))));
    }

    public getModules(): Observable<Package[]> {
        return this.ngRedux.select((state: any) => state.skysmack.currentTenant.modules).pipe(defined(), map(modules => modules.map(_module => PackageLoader.toPackage(_module))));
    }

    // TODO: Implement this correctly
    // public clearReduxState() {
    //     this.ngRedux.dispatch(this.actions.clearReduxState());
    // }
}
