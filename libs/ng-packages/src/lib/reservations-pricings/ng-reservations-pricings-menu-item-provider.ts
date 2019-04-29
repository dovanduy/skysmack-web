import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { safeHasValue, Package, MenuItemProvider, MenuItem } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { ReservationsPricingsType } from '@skysmack/packages-reservations-pricings';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgReservationsPricingsMenuItemProvider extends MenuItemProvider {
    public menuId = 'lodgingsReservations';
    public icon = 'shortText';

    constructor(public store: NgSkysmackStore) { super(); }

    public getItems(menuId: string, packagePath: string): Observable<MenuItem[]> {
        if (this.menuId === menuId) {
            return this.store.getSkysmack().pipe(
                safeHasValue(),
                map((currentTenant: Skysmack) => currentTenant.packages
                    .filter((_package: Package) => _package.type === ReservationsPricingsType.id && _package.dependencies.find(dep => dep === packagePath))
                    .map(_package => new MenuItem({
                        url: '/' + _package.path,
                        displayName: _package.name,
                        area: 'connected packages',
                        order: 20,
                        icon: this.icon,
                    }))
                )
            );
        } else {
            return of([]);
        }
    }
}
