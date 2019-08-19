import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { LodgingsTypeId } from '@skysmack/package-types';
import { LodgingTypesAvailabilityComponent } from './components/lodging-types-availability/lodging-types-availability.component';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesAvailabilityMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'LODGINGS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }
    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, LodgingsTypeId, componentKey, LodgingTypesAvailabilityComponent.COMPONENT_KEY, this.getLodgingTypesavailabilityMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, LodgingsTypeId, componentKey, LodgingTypesAvailabilityComponent.COMPONENT_KEY, this.getLodgingTypesavailabilityMenuItems, this.store);
    };

    private getLodgingTypesavailabilityMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    };

    private getLodgingTypesavailabilityMenuItems = (packagePath: string) => {
        return [
            setBackButton('/' + packagePath + '/types')
        ];
    };
}