import { OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MenuItem } from './menu-item';
import { MenuArea } from './menu-area';
import { NgSkysmackStore } from './../../../ng-packages/skysmack';
import { SubscriptionHandler } from '@skysmack/framework';
import { MenuItemProvider } from '../../providers/menu-item-provider';

export abstract class SidebarMenu implements OnDestroy {
    public abstract menuId: string;
    public abstract translationPrefix: string;

    public subscriptionHandler = new SubscriptionHandler();
    public packagePath: string;

    public primaryMenuAreas: MenuArea[] = [];
    public primaryMenuItems: MenuItem[] = [];

    public speedDialMenu: MenuItem[] = [];
    public defaultMenuArea = 'manage';

    constructor(
        public redux: NgSkysmackStore,
        public router: Router,
        @Inject(MenuItemProvider.TOKEN) public menuItemProviders: MenuItemProvider[],
    ) {
        this.setPath();
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }

    public abstract setPrimaryMenu(): void;

    public abstract setSpeedDialMenu(): void;

    public setPath() {
        this.packagePath = this.router.url.split('/')[1];
    }

    protected runMenuItemProviders() {
        this.menuItemProviders.forEach(provider => {
            this.subscriptionHandler.register(this.redux.getCurrentPackage(this.packagePath).pipe(
                // TODO: Use packagePath instead of id
                switchMap(currentPackage => provider.getItems(this.menuId, currentPackage.installedPackage.id)),
                map((menuItems: MenuItem[]) => menuItems.forEach(menuItem => this.addItem(menuItem)))
            ).subscribe());
        });
    }

    private addItem(item: MenuItem): void {
        const match = this.primaryMenuItems.find(menuItem => {
            if (menuItem.displayName === item.displayName && menuItem.url === item.url) {
                return true;
            } else {
                return false;
            }
        });
        if (!item.order) {
            item.order = 1 + this.primaryMenuItems.map(ma => ma.order).reduce((a, b) => Math.max(a, b));
        }
        if (!match) {
            this.primaryMenuItems.push(item);
        }
        this.primaryMenuItems.sort((a, b) => a.order - b.order);
    }
}



