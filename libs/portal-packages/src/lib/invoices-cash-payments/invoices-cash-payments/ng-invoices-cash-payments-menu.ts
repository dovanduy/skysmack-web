import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { INVOICES_CASH_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices-cash-payments';


@Injectable({ providedIn: 'root' })
export class NgInvoicesCashPaymentsMenu extends SidebarMenu {
    public menuId = INVOICES_CASH_PAYMENTS_AREA_KEY;
    public translationPrefix = 'INVOICES_CASH_PAYMENTS.INDEX.';

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
        this.addToPrimaryMenuAreas([
            new MenuArea({
                area: 'actions',
                translationPrefix: this.translationPrefix,
                order: 1,
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2,
            })
        ]);

        this.addToPrimaryMenuItems([
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'group_add',
                permissions: []
            })
        ]);

        this.setBackButton({ connectedPackage: true }).addConnectedPackageMenuArea();
    }

    public setSpeedDialMenu() {
        this.addToSpeedDialMenuItems([
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: []
            })
        ]);
    }
}
