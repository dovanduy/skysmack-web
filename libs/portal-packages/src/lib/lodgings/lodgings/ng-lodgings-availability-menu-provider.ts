import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { LodgingsTypeId } from '@skysmack/package-types';
import { LodgingsAvailabilityComponent } from './components/lodgings-availability/lodgings-availability.component';

@Injectable({ providedIn: 'root' })
export class NgLodgingsAvailabilityMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'LODGINGS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, LodgingsTypeId, componentKey, LodgingsAvailabilityComponent.COMPONENT_KEY, this.getLodgingsavailabilityMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, LodgingsTypeId, componentKey, LodgingsAvailabilityComponent.COMPONENT_KEY, this.getLodgingsavailabilityMenuItems, this.store);
    };

    public getLodgingsavailabilityMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    };

    public getLodgingsavailabilityMenuItems = (packagePath: string): MenuItem[] => {
        return [
            setBackButton(packagePath)
        ]
    };
}