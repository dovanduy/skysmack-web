import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { MenuItemProvider, MenuItem } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '../skysmack-core/skysmack/redux/ng-skysmack-store';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsMenuItemProvider extends MenuItemProvider {
    public menuId = 'lodgings';
    public icon = 'shortText';

    constructor(public store: NgSkysmackStore) { super(); }

    // TODO: FIX THIS - below is temp to shut up compiler
    public getItems(menuId: string, packageId: string): Observable<MenuItem[]> { return of([]); }
    // public getItems(menuId: string, packageId: string): Observable<MenuItem[]> {
    //     if (this.menuId === menuId) {
    //         return this.store.getCurrentTenant().pipe(
    //             safeHasValue(),
    //             map(currentTenant => currentTenant.features
    //                 .filter((feature: FeatureViewModel) => feature.type === LodgingsReservationsFeatureManifest.id && (feature.dependencyId === packageId))
    //                 .map(feature => new MenuItem('/' + feature.url, feature.name, 'manage', 20, this.icon))
    //             )
    //         );
    //     } else {
    //         return of([]);
    //     }
    // }
}
