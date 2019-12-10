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
import { MaintenanceStatesIndexComponent } from './maintenance-states/components/maintenance-states-index/maintenance-states-index.component';
import { AssignmentTypesIndexComponent } from './assignment-types/components/assignment-types-index/assignment-types-index.component';
import { SingleAssignmentsIndexComponent } from './single-assignments/components/single-assignments-index/single-assignments-index.component';
import { AssignmentsSchedulesIndexComponent } from './assignments-schedules/components/assignments-schedules-index/assignments-schedules-index.component';

@Injectable({ providedIn: 'root' })
export class NgAssignmentAllMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    public AssignmentsAllTranslationPrefix = 'MAINTENANCE.ASSIGNMENT_ALL.INDEX.';
    public SingleAssignmentsTranslationPrefix = 'SINGLE_ASSIGNMENTS.INDEX.';
    public AssignmentTypesTranslationPrefix = 'ASSIGNMENT_TYPES.INDEX.';
    public MaintenanceStatesTranslationPrefix = 'MAINTENANCE_STATES.INDEX.';
    public AssignmentsSchedulesTranslationPrefix = 'ASSIGNMENTS_SCHEDULES.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, AssignmentsAllIndexComponent.COMPONENT_KEY, this.getAssignmentsAllMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, SingleAssignmentsIndexComponent.COMPONENT_KEY, this.getAssignmentsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, AssignmentTypesIndexComponent.COMPONENT_KEY, this.getAssignmentTypesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, MaintenanceStatesIndexComponent.COMPONENT_KEY, this.getMaintenanceStatesMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, MaintenanceTypeId, componentKey, AssignmentsSchedulesIndexComponent.COMPONENT_KEY, this.getAssignmentsSchedulesMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, AssignmentsAllIndexComponent.COMPONENT_KEY, this.getAssignmentsAllMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, SingleAssignmentsIndexComponent.COMPONENT_KEY, this.getAssignmentsMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, AssignmentTypesIndexComponent.COMPONENT_KEY, this.getAssignmentTypesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, MaintenanceStatesIndexComponent.COMPONENT_KEY, this.getMaintenanceStatesMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, MaintenanceTypeId, componentKey, AssignmentsSchedulesIndexComponent.COMPONENT_KEY, this.getAssignmentsSchedulesMenuItems, this.store)
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

    private getAssignmentsAllMenuItems = () => {
        return [
            new MenuItem({
                url: 'assignments',
                displayName: this.AssignmentsAllTranslationPrefix + 'SINGLE_ASSIGNMENTS',
                area: 'manage',
                order: 1,
                icon: 'group_add',
                permissions: [
                    MaintenancePermissions.findSingleAssignments
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'assignments/schedules',
                displayName: this.AssignmentsAllTranslationPrefix + 'RECURRING_ASSIGNMENTS',
                area: 'manage',
                order: 2,
                icon: 'short_text',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'assignments/types',
                displayName: this.AssignmentsAllTranslationPrefix + 'TYPES',
                area: 'manage',
                order: 2,
                icon: 'description',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'states',
                displayName: this.AssignmentsAllTranslationPrefix + 'STATES',
                area: 'manage',
                order: 1,
                icon: 'short_text',
                permissions: [
                ],
                providedIn: [SIDEBAR]
            })
        ];
    };



    private getAssignmentsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.SingleAssignmentsTranslationPrefix,
                order: 1,
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.SingleAssignmentsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getAssignmentsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.SingleAssignmentsTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/assignments/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    MaintenancePermissions.addSingleAssignments
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    };



    private getAssignmentsSchedulesMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.AssignmentsSchedulesTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.AssignmentsSchedulesTranslationPrefix,
                order: 2
            })
        ];
    };

    private getAssignmentsSchedulesMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.AssignmentsSchedulesTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/assignments/schedules/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
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

    private getAssignmentTypesMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.AssignmentTypesTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/assignments/types/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(`${packagePath}`)
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

    private getMaintenanceStatesMenuItems = (packagePath: string) => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.MaintenanceStatesTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/states/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(`${packagePath}`)
        ];
    };
}