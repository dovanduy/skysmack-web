import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { EMAILS_AREA_KEY } from '@skysmack/packages-emails';


@Injectable({ providedIn: 'root' })
export class NgEmailsMenu extends SidebarMenu {
    public menuId = EMAILS_AREA_KEY;
    public translationPrefix = 'EMAILS.INDEX.';

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
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2,
            })
        ]);

        this.addToPrimaryMenuItems([
            new MenuItem({
                url: 'templates',
                displayName: this.translationPrefix + 'TEMPLATES',
                area: 'manage',
                order: 1,
                icon: 'groupAdd',
                permissions: [
                    // ???
                ]
            })
        ]);
    }

    public setSpeedDialMenu() {
    }
}
