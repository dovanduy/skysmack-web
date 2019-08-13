import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { LodgingsPermissions } from '@skysmack/packages-lodgings';
import { ReservationsPricingsTypeId } from '@skysmack/package-types';
import { LodgingTypePricesIndexComponent } from './components/lodging-type-prices-index/lodging-type-prices-index.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypePricesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'LODGING_TYPE_PRICES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingTypePricesIndexComponent.COMPONENT_KEY, this.getLodgingTypePricesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingTypePricesIndexComponent.COMPONENT_KEY, this.getLodgingTypePricesMenuItems, this.store);
    };

    public getLodgingTypePricesMenuAreas  = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    };

    public getLodgingTypePricesMenuItems  = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: ['sidebar', SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };
}