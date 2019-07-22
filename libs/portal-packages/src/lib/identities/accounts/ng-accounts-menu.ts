import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { ACCOUNTS_AREA_KEY } from '@skysmack/packages-identities';


@Injectable({ providedIn: 'root' })
export class NgAccountsMenu extends SidebarMenu {
    public menuId = ACCOUNTS_AREA_KEY;
    public translationPrefix = 'ACCOUNTS.INDEX.';

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
            order: 1,
        }));


        this.primaryMenuItems.push(new MenuItem({
            url: 'change-password',
            displayName: this.translationPrefix + 'CHANGE_PASSWORD',
            area: 'actions',
            order: 1,
            icon: 'groupAdd'
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'forgot-password',
            displayName: this.translationPrefix + 'FORGOT_PASSWORD',
            area: 'actions',
            order: 1,
            icon: 'groupAdd'
        }));

        this.primaryMenuItems.push(new MenuItem({
            url: 'confirm-email',
            displayName: this.translationPrefix + 'CONFIRM_EMAIL',
            area: 'actions',
            order: 1,
            icon: 'groupAdd'
        }));

        this.setBackButton();
    }

    public setSpeedDialMenu() {
        this.speedDialMenuItems = [
        ];
    }
}
