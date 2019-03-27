import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgAssignmentAllMenu extends SidebarMenu {
    public menuId = 'assignment-all';
    public translationPrefix = 'ASSIGNMENT_ALL.INDEX.';

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
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 1));
        this.primaryMenuItems.push(new MenuItem('assignments', this.translationPrefix + 'SINGLE_ASSIGNMENTS', 'manage', 2, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('assignments/recurring', this.translationPrefix + 'RECURRING_ASSIGNMENTS', 'manage', 3, 'shortText'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
