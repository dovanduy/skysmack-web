import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { MenuItemProvider, MenuArea, MenuItem } from '@skysmack/ng-ui';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsMenu extends SidebarMenu {
    public menuId = 'assignments';
    public translationPrefix = 'MAINTENANCE.ASSIGNMENTS.INDEX.';

    constructor(
        public redux: NgSkysmackStore,
        public router: Router,
        @Inject(MenuItemProvider.TOKEN) menuItemProviders: MenuItemProvider[],
    ) {
        super(redux, router, menuItemProviders);
        this.setPrimaryMenu();
        this.setSpeedDialMenu();
        this.runMenuItemProviders();
    }

    public setPrimaryMenu() {
        this.primaryMenuAreas.push(new MenuArea('actions', this.translationPrefix, 1));
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));

        this.primaryMenuItems.push(new MenuItem('create', this.translationPrefix + 'CREATE', 'actions', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('types', this.translationPrefix + 'TYPES', 'manage', 2, 'description'));
        this.primaryMenuItems.push(new MenuItem('maintenance-states', this.translationPrefix + 'STATES', 'manage', 3, 'shortText'));
        this.primaryMenuItems.push(new MenuItem('/' + this.packagePath, this.translationPrefix + 'BACK', 'manage', 4, 'arrowBack'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
