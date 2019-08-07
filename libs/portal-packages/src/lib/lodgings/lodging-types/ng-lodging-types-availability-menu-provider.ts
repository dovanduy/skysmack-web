import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setBackButtonV2 } from '@skysmack/ng-framework';
import { LodgingsTypeId } from '@skysmack/package-types';
import { LodgingTypesAvailabilityComponent } from './components/lodging-types-availability/lodging-types-availability.component';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesAvailabilityMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'LODGINGS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, LodgingsTypeId, componentKey, LodgingTypesAvailabilityComponent.COMPONENT_KEY, this.getLodgingTypesavailabilityMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, LodgingsTypeId, componentKey, LodgingTypesAvailabilityComponent.COMPONENT_KEY, this.getLodgingTypesavailabilityMenuItems, this.store);
    };

    public getLodgingTypesavailabilityMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    };

    public getLodgingTypesavailabilityMenuItems = (packagePath: string) => {
        return [
            setBackButtonV2('/' + packagePath + '/types')
        ];
    };
}