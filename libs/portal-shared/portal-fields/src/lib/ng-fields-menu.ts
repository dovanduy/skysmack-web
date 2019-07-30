import { Injectable } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { SidebarMenu } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { NgMenuItemProviders } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgFieldsMenu extends SidebarMenu {
    public menuId = 'fields';
    public translationPrefix = 'FIELDS.INDEX.';

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

        // Since the below router subscription isn't fired on first page load, initial menu items have to be set.
        this.addPrimaryMenuItems();

        // Reset the menu items for dynamic fields on navigation to a fields page.
        // Otherwise these will only be set once when first navigating to a fields page
        // (since this class is only instantiated once because of dependency injection).
        this.router.events.subscribe((event) => {
            if (event instanceof ActivationEnd && event.snapshot.url.find(urlSegment => urlSegment.path === 'fields')) {
                this.setPaths();
                this.primaryMenuItems$.next([]);
                this.addPrimaryMenuItems();
            }
        });
    }

    public addPrimaryMenuItems() {
        this.addToPrimaryMenuItems([
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'groupAdd',
                permissions: []
            })
        ]);
        this.setBackButton({ customPath: `/${this.packagePath}/${this.additionalPaths.join('/')}` });
    }

    public setSpeedDialMenu() {
        this.addToSpeedDialMenuItems([
            new MenuItem({
                url: 'create',
                displayName: this.translationPrefix + 'CREATE',
                area: undefined,
                order: 1,
                icon: 'add',
            })
        ]);
    }
}
