import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { SidebarMenu } from './../models/sidebar-menu/sidebar-menu';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { MenuItemProvider } from '@skysmack/ng-ui';
import { MenuArea } from '@skysmack/ng-ui';
import { MenuItem } from '@skysmack/ng-ui';

@Injectable({ providedIn: 'root' })
export class NgDynamicFieldsMenu extends SidebarMenu {
    public menuId = 'fields';
    public translationPrefix = 'FIELDS.INDEX.';

    constructor(
        public redux: NgSkysmackStore,
        public router: Router,
        @Inject(MenuItemProvider.TOKEN) menuItemProviders: MenuItemProvider[]
    ) {
        super(redux, router, menuItemProviders);
        this.setPrimaryMenu();
        this.setSpeedDialMenu();
        this.runMenuItemProviders();
    }

    public setPrimaryMenu() {
        this.primaryMenuAreas.push(new MenuArea('actions', this.translationPrefix, 1));
        this.primaryMenuAreas.push(new MenuArea('manage', this.translationPrefix, 2));

        // Since the below router subscription isn't fired on first page load, initial menu items have to be set.
        this.addPrimaryMenuItems();

        // Reset the menu items for dynamic fields on navigation to a fields page.
        // Otherwise these will only be set once when first navigating to a fields page
        // (since this class is only instantiated once because dependency injection).
        this.router.events.subscribe((event) => {
            if (event instanceof ActivationEnd && event.snapshot.url.find(urlSegment => urlSegment.path === 'fields')) {
                this.setPaths();
                this.primaryMenuItems = [];
                this.addPrimaryMenuItems();
            }
        });
    }

    public addPrimaryMenuItems() {
        this.primaryMenuItems.push(new MenuItem('create', this.translationPrefix + 'CREATE', 'actions', 1, 'groupAdd'));
        this.primaryMenuItems.push(new MenuItem(`/${this.packagePath}/${this.additionalPaths.join('/')}`, this.translationPrefix + 'BACK', 'manage', 2, 'arrowBack'));
    }

    public setSpeedDialMenu() {
        this.speedDialMenu = [
            new MenuItem('create', this.translationPrefix + 'CREATE', undefined, 1, 'add'),
        ];
    }
}
