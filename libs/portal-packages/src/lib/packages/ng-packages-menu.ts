import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';

import { SidebarMenu } from '@skysmack/portal-ui';
import { PackagesPermissions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

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
        
    }

    public setPrimaryMenu() {
        this.primaryMenuAreas.push(new MenuArea({
            area: 'actions',
            translationPrefix: this.translationPrefix,
            order: 1,
        }));
        this.primaryMenuAreas.push(new MenuArea({
            area: 'manage',
            translationPrefix: this.translationPrefix,
            order: 2,
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'create',
            displayName: this.translationPrefix + 'CREATE',
            area: 'actions',
            order: 1,
            icon: 'groupAdd',
            permissions: [
                PackagesPermissions.addPackages
            ]
        }));

        // Menu button to navigate to available package charts when that code is uncommented.
        // this.primaryMenuItems.push(new MenuItem('available_packages', this.translationPrefix + 'AVAILABLE_PACKAGES', 'manage', 2, 'groupAdd'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenuItems = [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: undefined,
                order: 1,
                icon: 'add',
                permissions: [
                    PackagesPermissions.addPackages
                ]
            }),
        ];
    }
}
