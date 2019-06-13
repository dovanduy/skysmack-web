import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { LodgingsPermissions } from '@skysmack/packages-lodgings';


@Injectable({ providedIn: 'root' })
export class NgLodgingTypesMenu extends SidebarMenu {
    public menuId = 'Lodging-types';
    public translationPrefix = 'LODGING_TYPES.INDEX.';

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

        this.primaryMenuItems.push(new MenuItem({
            url: 'create',
            displayName: this.translationPrefix + 'CREATE',
            area: 'actions',
            order: 1,
            icon: 'groupAdd',
            permissions: [
                LodgingsPermissions.addLodgingTypes
            ]
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'fields',
            displayName: this.translationPrefix + 'FIELDS',
            area: 'manage',
            order: 2,
            icon: 'shortText',
            permissions: [
                LodgingsPermissions.addLodgingTypeFields
            ]
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: '/' + this.packagePath + '/types/availability',
            displayName: this.translationPrefix + 'AVAILABILITY',
            area: 'manage',
            order: 4,
            icon: 'groupAdd',
        }));
        this.setBackButton();
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: undefined,
                order: 1,
                icon: 'add',
                permissions: [
                    LodgingsPermissions.addLodgingTypes
                ]
            }),
        ];
    }
}
