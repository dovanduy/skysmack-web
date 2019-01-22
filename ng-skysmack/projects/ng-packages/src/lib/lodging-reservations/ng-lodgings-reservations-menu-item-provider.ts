import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { MenuItemProvider, MenuItem } from '@skysmack/ng-ui';
import { NgSkysmackStore } from './../skysmack-core/skysmack/redux/ng-skysmack-store';
import { safeHasValue, Package } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { LodgingReservationsType } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsMenuItemProvider extends MenuItemProvider {
    public menuId = 'lodgings';
    public icon = 'shortText';

    constructor(public store: NgSkysmackStore) { super(); }

    public getItems(menuId: string, packagePath: string): Observable<MenuItem[]> {
        if (this.menuId === menuId) {
            return this.store.getSkysmack().pipe(
                safeHasValue(),
                map((currentTenant: Skysmack) => currentTenant.packages
                    .filter((_package: Package) => _package.type === LodgingReservationsType.id && _package.dependencies.find(dep => dep === packagePath))
                    .map(_package => new MenuItem('/' + _package.path, _package.name, 'manage', 20, this.icon))
                )
            );
        } else {
            return of([]);
        }
    }
}
