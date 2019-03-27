import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgMenuItemProviders } from '@skysmack/ng-redux';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { BASKETS_AREA_KEY } from '@skysmack/packages-baskets';


@Injectable({ providedIn: 'root' })
export class NgBasketsMenu extends SidebarMenu {
    public menuId = BASKETS_AREA_KEY;
    public translationPrefix = 'BASKETS.INDEX.';

    constructor(
        public store: NgSkysmackStore,
        public router: Router,
        public menuItemProviders: NgMenuItemProviders
    ) {
        super(store, router, menuItemProviders);
        this.setPrimaryMenu();
        this.setSpeedDialMenu();
        this.runMenuItemProviders();
    }

    public setPrimaryMenu() {
        this.primaryMenuAreas.push(new MenuArea('actions', this.translationPrefix, 1));
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));

        this.primaryMenuItems.push(new MenuItem('create', this.translationPrefix + 'CREATE', 'actions', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('fields', this.translationPrefix + 'FIELDS', 'manage', 2, 'shortText'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
