import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { INVOICES_AREA_KEY, InvoicesPermissions } from '@skysmack/packages-invoices';


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
                InvoicesPermissions.addInvoices
            ]
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'fields',
            displayName: this.translationPrefix + 'FIELDS',
            area: 'manage',
            order: 2,
            icon: 'shortText',
            permissions: [
                InvoicesPermissions.findInvoicesFields
            ]
        }));
        this.primaryMenuItems.push(new MenuItem({
            url: 'payments',
            displayName: this.translationPrefix + 'PAYMENTS',
            area: 'manage',
            order: 2,
            icon: 'shortText',
            permissions: [
                InvoicesPermissions.findInvoicePayments
            ]
        }));
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
                    InvoicesPermissions.addInvoices
                ]
            }),
        ];
    }
}
