import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { SidebarMenu } from '@skysmack/portal-ui';
    import { NgSkysmackStore } from '@skysmack/ng-core';
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
        this.primaryMenuAreas.push(new MenuArea({
            area: 'connected packages',
            translationPrefix: this.translationPrefix,
            order: 3,
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'create',
            displayName: this.translationPrefix + 'CREATE',
            area: 'actions',
            order: 1,
            icon: 'groupAdd',
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'types',
            displayName: this.translationPrefix + 'TYPES',
            area: 'manage',
            order: 2,
            icon: 'description',
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'fields',
            displayName: this.translationPrefix + 'FIELDS',
            area: 'manage',
            order: 2,
            icon: 'shortText',
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: '/' + this.packagePath + '/availability',
            displayName: this.translationPrefix + 'AVAILABILITY',
            area: 'manage',
            order: 4,
            icon: 'groupAdd',
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
