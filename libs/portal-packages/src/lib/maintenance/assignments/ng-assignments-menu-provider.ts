import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { MaintenancePermissions } from '@skysmack/packages-maintenance';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { MaintenanceTypeId } from '@skysmack/package-types';
import { AssignmentsIndexComponent } from './components/assignments-index/assignments-index.component';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'ASSIGNMENTS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, AssignmentsIndexComponent.COMPONENT_KEY, this.getAssignmentsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, AssignmentsIndexComponent.COMPONENT_KEY, this.getAssignmentsMenuItems, this.store);
    };

    private getAssignmentsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1,
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    };

    private getAssignmentsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    MaintenancePermissions.addAssignments
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'types',
                displayName: this.translationPrefix + 'TYPES',
                area: 'manage',
                order: 2,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'maintenance-states',
                displayName: this.translationPrefix + 'STATES',
                area: 'manage',
                order: 1,
                icon: 'short_text',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            setBackButton(packagePath)
        ];
    };
}