import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { ReservationsPricingsTypeId } from '@skysmack/package-types';
import { LodgingPricesIndexComponent } from './components/lodging-prices-index/lodging-prices-index.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingPricesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'LODGING_PRICES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingPricesIndexComponent.COMPONENT_KEY, this.getLodgingPricesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, ReservationsPricingsTypeId, componentKey, LodgingPricesIndexComponent.COMPONENT_KEY, this.getLodgingPricesMenuItems, this.store);
    };

    public getLodgingPricesMenuAreas = () => {
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

    public getLodgingPricesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: ['sidebar', 'speedDial']
            }),
            setBackButton(packagePath)
        ];
    };
}