import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgAssignmentAllMenu extends SidebarMenu {
    public menuId = 'assignment-all';
    public translationPrefix = 'MAINTENANCE.ASSIGNMENT_ALL.INDEX.';

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
        this.primaryMenuAreas.push(new MenuArea({
            area: 'manage',
            translationPrefix: this.translationPrefix,
            order: 1,
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'assignments',
            displayName: this.translationPrefix + 'SINGLE_ASSIGNMENTS',
            area: 'manage',
            order: 2,
            icon: 'groupAdd',
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'assignments/recurring',
            displayName: this.translationPrefix + 'RECURRING_ASSIGNMENTS',
            area: 'manage',
            order: 3,
            icon: 'shortText',
        }));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: undefined,
                order: 1,
                icon: 'add',
            }),
        ];
    }
}