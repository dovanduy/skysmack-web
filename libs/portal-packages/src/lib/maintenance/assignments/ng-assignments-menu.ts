import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { ASSIGNMENTS_AREA_KEY, MaintenancePermissions } from '@skysmack/packages-maintenance';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsMenu extends SidebarMenu {
    public menuId = ASSIGNMENTS_AREA_KEY;
    public translationPrefix = 'ASSIGNMENTS.INDEX.';

    constructor(
        public redux: NgSkysmackStore,
        public router: Router,
        public menuItemProviders: NgMenuItemProviders
    ) {
        super(redux, router, menuItemProviders);
        this.setPrimaryMenu();
        this.setSpeedDialMenu();
        this.runMenuItemProviders();
    }

    public setPrimaryMenu() {
        this.addToPrimaryMenuAreas([
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
        ]);

        this.addToPrimaryMenuItems([
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    MaintenancePermissions.addAssignments
                ]
            }),
            new MenuItem({
                url: 'types',
                displayName: this.translationPrefix + 'TYPES',
                area: 'manage',
                order: 2,
                icon: 'description',
                permissions: [
                    MaintenancePermissions.findAssignmentTypes
                ]
            }),
            new MenuItem({
                url: 'maintenance-states',
                displayName: this.translationPrefix + 'STATES',
                area: 'manage',
                order: 3,
                icon: 'shortText',
                permissions: [
                    MaintenancePermissions.findMaintenanceStates
                ]
            })
        ]);

        this.setBackButton();
    }

    public setSpeedDialMenu() {
        this.addToSpeedDialMenuItems([
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: undefined,
                order: 1,
                icon: 'add',
                permissions: [
                    MaintenancePermissions.addAssignments
                ]
            })
        ]);
    }
}
