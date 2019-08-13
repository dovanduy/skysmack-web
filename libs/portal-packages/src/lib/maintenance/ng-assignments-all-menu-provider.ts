import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { MaintenancePermissions } from '@skysmack/packages-maintenance';
import { getMenuEntries, getCombinedMenuEntries, setBackButton } from '@skysmack/ng-framework';
import { MaintenanceTypeId } from '@skysmack/package-types';
import { AssignmentsAllIndexComponent } from './components/assignments-all/assignments-all.component';
import { AssignmentsIndexComponent } from './assignments/components/assignments-index/assignments-index.component';
import { MaintenanceStatesIndexComponent } from './maintenance-states/components/maintenance-states-index/maintenance-states-index.component';
import { AssignmentTypesIndexComponent } from './assignment-types/components/assignment-types-index/assignment-types-index.component';
import { RecurringAssignmentsIndexComponent } from './recurring-assignments/components/recurring-assignments-index/recurring-assignments-index.component';

@Injectable({ providedIn: 'root' })
export class NgAssignmentAllMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public AssignmentsAllTranslationPrefix = 'MAINTENANCE.ASSIGNMENT_ALL.INDEX.';
    public AssignmentsTranslationPrefix = 'ASSIGNMENTS.INDEX.';
    public AssignmentTypesTranslationPrefix = 'ASSIGNMENT_TYPES.INDEX.';
    public MaintenanceStatesTranslationPrefix = 'MAINTENANCE_STATES.INDEX.';
    public RecurringAssignmentsTranslationPrefix = 'RECURRING_ASSIGNMENTS.INDEX.';

    constructor(
        public store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, AssignmentsAllIndexComponent.COMPONENT_KEY, this.getAssignmentsAllMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, AssignmentsIndexComponent.COMPONENT_KEY, this.getAssignmentsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, AssignmentTypesIndexComponent.COMPONENT_KEY, this.getAssignmentTypesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, MaintenanceStatesIndexComponent.COMPONENT_KEY, this.getMaintenanceStatesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, RecurringAssignmentsIndexComponent.COMPONENT_KEY, this.getRecurringAssignmentsMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, AssignmentsAllIndexComponent.COMPONENT_KEY, this.getAssignmentsAllMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, AssignmentsIndexComponent.COMPONENT_KEY, this.getAssignmentsMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, AssignmentTypesIndexComponent.COMPONENT_KEY, this.getAssignmentTypesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, MaintenanceStatesIndexComponent.COMPONENT_KEY, this.getMaintenanceStatesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, RecurringAssignmentsIndexComponent.COMPONENT_KEY, this.getRecurringAssignmentsMenuItems, this.store)
        );
    };


    private getAssignmentsAllMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.AssignmentsAllTranslationPrefix,
                order: 1
            })
        ];
    };

    private getAssignmentsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.AssignmentsTranslationPrefix,
                order: 1,
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.AssignmentsTranslationPrefix,
                order: 2
            })
        ];
    };
    private getAssignmentTypesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.AssignmentTypesTranslationPrefix,
                order: 1,
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.AssignmentTypesTranslationPrefix,
                order: 2
            })
       ];
    };

    private getMaintenanceStatesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.MaintenanceStatesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.MaintenanceStatesTranslationPrefix,
                order: 2
            })
        ];
    };

    private getRecurringAssignmentsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.RecurringAssignmentsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.RecurringAssignmentsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getAssignmentsAllMenuItems = () => {
        return [
            new MenuItem({
                url: 'assignments',
                displayName: this.AssignmentsAllTranslationPrefix + 'SINGLE_ASSIGNMENTS',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    MaintenancePermissions.findAssignments
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'assignments/recurring',
                displayName: this.AssignmentsAllTranslationPrefix + 'RECURRING_ASSIGNMENTS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            })
        ];
    };

    private getAssignmentsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.AssignmentsTranslationPrefix + 'CREATE',
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
                displayName: this.AssignmentsTranslationPrefix + 'TYPES',
                area: 'manage',
                order: 2,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'maintenance-states',
                displayName: this.AssignmentsTranslationPrefix + 'STATES',
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

    private getAssignmentTypesMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.AssignmentTypesTranslationPrefix + 'CREATE',
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

    private getMaintenanceStatesMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.MaintenanceStatesTranslationPrefix + 'CREATE',
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

    private getRecurringAssignmentsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.RecurringAssignmentsTranslationPrefix + 'CREATE',
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