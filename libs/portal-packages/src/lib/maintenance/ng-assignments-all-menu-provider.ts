import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { MaintenancePermissions } from '@skysmack/packages-maintenance';
import { getMenuEntries } from '@skysmack/ng-framework';
import { MaintenanceTypeId } from '@skysmack/package-types';
import { AssignmentsAllIndexComponent } from './components/assignments-all/assignments-all.component';

@Injectable({ providedIn: 'root' })
export class NgAssignmentAllMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'MAINTENANCE.ASSIGNMENT_ALL.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, AssignmentsAllIndexComponent.COMPONENT_KEY, this.getAssignmentsAllMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, AssignmentsAllIndexComponent.COMPONENT_KEY, this.getAssignmentsAllMenuItems, this.store);
    };


    public getAssignmentsAllMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 1
            })
        ];
    };

    public getAssignmentsAllMenuItems = () => {
        return [
            new MenuItem({
                url: 'assignments',
                displayName: this.translationPrefix + 'SINGLE_ASSIGNMENTS',
                area: 'manage',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    MaintenancePermissions.findAssignments
                ],
                providedIn: ['sidebar']
            }),
            new MenuItem({
                url: 'assignments/recurring',
                displayName: this.translationPrefix + 'RECURRING_ASSIGNMENTS',
                area: 'manage',
                order: 2,
                icon: 'shortText',
                permissions: [
                ],
                providedIn: ['sidebar']
            })
        ];
    };
}