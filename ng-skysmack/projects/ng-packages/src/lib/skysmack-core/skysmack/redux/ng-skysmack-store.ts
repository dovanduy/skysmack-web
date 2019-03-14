import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { map, filter, take } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { LocalObject, toLocalObject, flatten, safeHasValue, Package, hasValue } from '@skysmack/framework';
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

    public getEditorItem(): Observable<LocalObject<any, any>> {
        const copy = this.editorItem;
        this.editorItem = undefined;
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
            map(skysmack => skysmack.packages.filter(_package => _package.access).map(_package => toLocalObject(_package, 'path')))
        );
    }

    public getLoadedPackages(): Observable<LoadedPackage[]> {
        return this.getPackages().pipe(
            map(packages => packages.map(_package => PackageLoader.toLoadedPackage(_package.object)))
        );
    }

    public getSkysmackLoaded(): Observable<boolean> {
        return this.ngRedux.select((state: SkysmackAppState) => state.skysmack.tenantLoaded);
    }

    public getCurrentPackage(packagePath: string): Observable<LoadedPackage> {
        return this.getPackages().pipe(
            flatten(),
            filter((_package: LocalObject<Package, string>) => _package.object.path === packagePath),
            map(_package => PackageLoader.toLoadedPackage(_package.object)),
            safeHasValue()
        );
    }

    public getAuthenticationPackages(): Observable<Package[]> {
        return this.getPackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === Oauth2Type.id).map(x => x.object))
        );
    }

    public getIdentityPackages(): Observable<Package[]> {
        return this.getPackages().pipe(
            map(packages => packages.filter(_package => _package.object.type === IdentitiesType.id).map(x => x.object))
        );
    }
}
