import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { NgSkysmackStore } from './../skysmack-core/skysmack/redux/ng-skysmack-store';
import { safeHasValue, Package, MenuItemProvider, MenuItem } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { ProductsPricingsType } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductsPricingsMenuItemProvider extends MenuItemProvider {
    public menuId = 'products';
    public icon = 'shortText';

    constructor(public store: NgSkysmackStore) { super(); }

    public getItems(menuId: string, packagePath: string): Observable<MenuItem[]> {
        if (this.menuId === menuId) {
            return this.store.getSkysmack().pipe(
                safeHasValue(),
                map((currentTenant: Skysmack) => currentTenant.packages
                    .filter((_package: Package) => _package.type === ProductsPricingsType.id && _package.dependencies.find(dep => dep === packagePath))
                    .map(_package => new MenuItem('/' + _package.path, _package.name, 'connected packages', 20, this.icon))
                )
            );
        } else {
            return of([]);
        }
    }
}
