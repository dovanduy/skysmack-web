import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { MaintenanceTypeId } from '@skysmack/package-types';
import { MaintenanceStatesIndexComponent } from './components/maintenance-states-index/maintenance-states-index.component';

@Injectable({ providedIn: 'root' })
export class NgMaintenanceStatesMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'MAINTENANCE_STATES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, MaintenanceStatesIndexComponent.COMPONENT_KEY, this.getMaintenanceStatesMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, MaintenanceStatesIndexComponent.COMPONENT_KEY, this.getMaintenanceStatesMenuItems, this.store);
    };

    private getMaintenanceStatesMenuAreas = () => {
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

    private getMaintenanceStatesMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(`${packagePath}/assignments`)
        ];
    };
}