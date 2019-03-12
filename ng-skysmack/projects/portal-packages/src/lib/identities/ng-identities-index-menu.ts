import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgIdentitiesIndexMenu extends SidebarMenu {
    public menuId = 'identities-index';
    public translationPrefix = 'IDENTITIES_INDEX.';

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
        this.primaryMenuAreas.push(new MenuArea('settings', this.translationPrefix, 2));
        this.primaryMenuItems.push(new MenuItem('roles', this.translationPrefix + 'ROLES', 'manage', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('users', this.translationPrefix + 'USERS', 'manage', 2, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('settings/lockout', this.translationPrefix + 'AVAILABLE_SETTINGS.LOCKOUT', 'settings', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('settings/user', this.translationPrefix + 'AVAILABLE_SETTINGS.USER', 'settings', 2, 'groupAdd'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
