import { OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MenuItem } from '@skysmack/ng-ui';
import { MenuArea } from '@skysmack/ng-ui';
import { NgSkysmackStore, LoadedPackage } from '@skysmack/ng-packages';
import { SubscriptionHandler } from '@skysmack/framework';
import { MenuItemProvider } from '@skysmack/ng-ui';

export abstract class SidebarMenu implements OnDestroy {
    public abstract menuId: string;
    public abstract translationPrefix: string;

    public subscriptionHandler = new SubscriptionHandler();
    public packagePath: string;
    public additionalPaths: string[];

    public primaryMenuAreas: MenuArea[] = [];
    public primaryMenuItems: MenuItem[] = [];

    public speedDialMenu: MenuItem[] = [];
    public defaultMenuArea = 'manage';

    constructor(
        public store: NgSkysmackStore,
        public router: Router,
        @Inject(MenuItemProvider.TOKEN) public menuItemProviders: MenuItemProvider[],
    ) {
        this.setPaths();
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }

    public abstract setPrimaryMenu(): void;

    public abstract setSpeedDialMenu(): void;

    public setPaths() {
        this.packagePath = this.router.url.split('/')[1];
        this.additionalPaths = this.router.url.split('/').slice(2).filter(x => x !== 'fields');
    }

    protected runMenuItemProviders() {
        this.menuItemProviders.forEach(provider => {
            this.subscriptionHandler.register(this.store.getCurrentPackage(this.packagePath).pipe(
                switchMap((currentPackage: LoadedPackage) => provider.getItems(this.menuId, currentPackage._package.path)),
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



