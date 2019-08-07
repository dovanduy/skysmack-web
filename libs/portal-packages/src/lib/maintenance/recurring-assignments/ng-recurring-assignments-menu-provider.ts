import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { of, Observable } from 'rxjs';
import { setBackButton, getMenuEntries, setBackButtonV2 } from '@skysmack/ng-framework';
import { MaintenancePermissions } from '@skysmack/packages-maintenance';
import { MaintenanceTypeId } from '@skysmack/package-types';
import { RecurringAssignmentsIndexComponent } from './components/recurring-assignments-index/recurring-assignments-index.component';

@Injectable({ providedIn: 'root' })
export class NgRecurringAssignmentsMenuProvider extends MenuProvider {
    public id = Guid.create().toString();
    public translationPrefix = 'RECURRING_ASSIGNMENTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { super(); }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, RecurringAssignmentsIndexComponent.COMPONENT_KEY, this.getRecurringAssignmentsMenuAreas, this.store);
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, RecurringAssignmentsIndexComponent.COMPONENT_KEY, this.getRecurringAssignmentsMenuItems, this.store);
    };

    public getRecurringAssignmentsMenuAreas = () => {
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

    public getRecurringAssignmentsMenuItems = (packagePath: string): MenuItem[] => {
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
            setBackButtonV2(packagePath)
        ];
    };
}