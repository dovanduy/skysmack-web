import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-redux';

import { SidebarMenu } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesAvailabilityMenu extends SidebarMenu {
    public menuId = 'lodgingTypesAvailability';
    public translationPrefix = 'LODGINGS.INDEX.';

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
        // this.primaryMenuAreas.push(new MenuArea('actions', this.translationPrefix, 1));
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));

        this.primaryMenuItems.push(new MenuItem('/' + this.packagePath + '/types', this.translationPrefix + 'BACK', 'manage', 4, 'groupAdd'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
