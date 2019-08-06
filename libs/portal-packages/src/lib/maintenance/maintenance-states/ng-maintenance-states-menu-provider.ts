import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { setBackButton, getMenuEntries, setBackButtonV2 } from '@skysmack/ng-framework';
import { MaintenancePermissions } from '@skysmack/packages-maintenance';
import { MaintenanceTypeId } from '@skysmack/package-types';
import { MaintenanceStatesIndexComponent } from './components/maintenance-states-index/maintenance-states-index.component';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'MAINTENANCE_STATES.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, MaintenanceStatesIndexComponent.COMPONENT_KEY, this.getMaintenanceStatesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, MaintenanceStatesIndexComponent.COMPONENT_KEY, this.getMaintenanceStatesMenuItems, this.store);
    };

    public getMaintenanceStatesMenuAreas = () => {
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

    public getMaintenanceStatesMenuItems = () => {
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
                setBackButtonV2('assignments')
            ];
    };
}