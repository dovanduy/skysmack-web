import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-redux';

import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';

@Injectable({ providedIn: 'root' })
export class NgPackagesMenu extends SidebarMenu {
    public menuId = 'packages';
    public translationPrefix = 'PACKAGES.INDEX.';

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
        this.primaryMenuAreas.push(new MenuArea('actions', this.translationPrefix, 1));
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));
        this.primaryMenuItems.push(new MenuItem({
            url: 'create',
            displayName: this.translationPrefix + 'CREATE',
            area: 'actions',
            order: 1,
            icon: 'groupAdd',
        }));

        // Menu button to navigate to available package charts when that code is uncommented.
        // this.primaryMenuItems.push(new MenuItem('available_packages', this.translationPrefix + 'AVAILABLE_PACKAGES', 'manage', 2, 'groupAdd'));
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
