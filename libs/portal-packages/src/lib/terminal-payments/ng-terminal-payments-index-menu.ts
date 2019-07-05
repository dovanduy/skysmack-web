import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgTerminalPaymentsIndexMenu extends SidebarMenu {
    public menuId = 'terminalPaymentsIndex';
    public translationPrefix = 'TERMINAL_PAYMENTS_INDEX.';

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
            area: 'manage',
            translationPrefix: this.translationPrefix,
            order: 2,
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'terminals',
            displayName: this.translationPrefix + 'TERMINALS',
            area: 'manage',
            order: 2,
            icon: 'description',
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'clients',
            displayName: this.translationPrefix + 'CLIENTS',
            area: 'manage',
            order: 2,
            icon: 'description',
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'connections',
            displayName: this.translationPrefix + 'CONNECTIONS',
            area: 'manage',
            order: 2,
            icon: 'description',
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'receipts',
            displayName: this.translationPrefix + 'RECEIPTS',
            area: 'manage',
            order: 2,
            icon: 'description',
        }));

        this.setBackButton({ connectedPackage: true }).addConnectedPackageMenuArea();
    }

    public setSpeedDialMenu() {
        this.speedDialMenuItems = [];
    }
}
