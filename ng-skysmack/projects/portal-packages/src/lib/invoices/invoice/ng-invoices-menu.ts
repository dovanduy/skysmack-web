import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgMenuItemProviders } from '@skysmack/ng-redux';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { INVOICES_AREA_KEY } from '@skysmack/packages-invoices';


@Injectable({ providedIn: 'root' })
export class NgInvoicesMenu extends SidebarMenu {
    public menuId = INVOICES_AREA_KEY;
    public translationPrefix = 'INVOICES.INDEX.';

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
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'fields',
            displayName: this.translationPrefix + 'FIELDS',
            area: 'manage',
            order: 2,
            icon: 'shortText',
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'items',
            displayName: this.translationPrefix + 'ITEMS',
            area: 'manage',
            order: 2,
            icon: 'shortText',
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'payments',
            displayName: this.translationPrefix + 'PAYMENTS',
            area: 'manage',
            order: 2,
            icon: 'shortText',
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
