import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { safeHasValue, Package, MenuItemProvider, MenuItem } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ProductsPricingsTypeId } from '@skysmack/package-types';
import { Guid } from 'guid-typescript';
import { PRODUCTS_AREA_KEY } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductsPricingsMenuItemProvider extends MenuItemProvider {
    public id = Guid.create().toString();
    public menuId = PRODUCTS_AREA_KEY;
    public icon = 'link';

    constructor(public store: NgSkysmackStore) { super(); }

    public getItems(menuId: string, packagePath: string): Observable<MenuItem[]> {
        if (this.menuId === menuId) {
            return this.store.getSkysmack().pipe(
                safeHasValue(),
                map((currentTenant: Skysmack) => currentTenant.packages
                    .filter((_package: Package) => _package.type === ProductsPricingsTypeId && _package.dependencies.find(dep => dep === packagePath))
                    .map(_package => new MenuItem({
                        url: '/' + _package.path,
                        displayName: _package.name,
                        area: 'connected_packages',
                        order: 20,
                        icon: this.icon,
                        provideIn: 'primaryMenu'
                    }))
                )
            );
        } else {
            return of([]);
        }
    }
}
