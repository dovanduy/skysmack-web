import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';

import { SidebarMenu } from '@skysmack/portal-ui';

@Injectable({ providedIn: 'root' })
export class NgLodgingsAvailabilityMenu extends SidebarMenu {
    public menuId = 'lodgingsAvailability';
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
        this.addToPrimaryMenuAreas([
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2,
            })
        ]);
        this.setBackButton();
    }

    public setSpeedDialMenu() {
    }
}
