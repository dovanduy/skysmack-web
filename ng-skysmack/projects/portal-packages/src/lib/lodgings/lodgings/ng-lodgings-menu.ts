import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgMenuItemProviders } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgLodgingsMenu extends SidebarMenu {
    public menuId = 'lodgings';
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
        this.primaryMenuAreas.push(new MenuArea('actions', this.translationPrefix, 1));
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));

        this.primaryMenuItems.push(new MenuItem('create', this.translationPrefix + 'CREATE', 'actions', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem('types', this.translationPrefix + 'TYPES', 'manage', 2, 'description'));
        this.primaryMenuItems.push(new MenuItem('fields', this.translationPrefix + 'FIELDS', 'manage', 2, 'shortText'));
        this.primaryMenuItems.push(new MenuItem('/' + this.packagePath + '/availability', this.translationPrefix + 'AVAILABILITY', 'manage', 4, 'groupAdd'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
