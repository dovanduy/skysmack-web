import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SPEEDDIAL, SIDEBAR } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { getMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { MaintenancePermissions } from '@skysmack/packages-maintenance';
import { MaintenanceTypeId } from '@skysmack/package-types';
import { RecurringAssignmentsIndexComponent } from './components/recurring-assignments-index/recurring-assignments-index.component';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'RECURRING_ASSIGNMENTS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, RecurringAssignmentsIndexComponent.COMPONENT_KEY, this.getRecurringAssignmentsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, RecurringAssignmentsIndexComponent.COMPONENT_KEY, this.getRecurringAssignmentsMenuItems, this.store);
    };

    private getRecurringAssignmentsMenuAreas = () => {
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

    private getRecurringAssignmentsMenuItems = (packagePath: string): MenuItem[] => {
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
            setBackButton(packagePath)
        ];
    };
}