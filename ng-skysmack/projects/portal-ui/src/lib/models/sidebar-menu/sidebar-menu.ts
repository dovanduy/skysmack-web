import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, filter, take } from 'rxjs/operators';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';

import { NgSkysmackStore, LoadedPackage } from '@skysmack/ng-packages';
import { SubscriptionHandler } from '@skysmack/framework';
import { NgMenuItemProviders, getAdditionalPaths } from '@skysmack/ng-redux';

interface BackButtonOptions {
    connectedPackage?: boolean;
    customPath?: string;
}

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
        public menuItemProviders: NgMenuItemProviders
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
        this.additionalPaths = getAdditionalPaths(this.router, this.packagePath);
    }

    protected runMenuItemProviders() {
        this.menuItemProviders.providers.forEach(provider => {
            this.subscriptionHandler.register(this.store.getCurrentPackage(this.packagePath).pipe(
                filter(loadedPackage => loadedPackage._package !== null),
                switchMap((currentPackage: LoadedPackage) => provider.getItems(this.menuId, currentPackage._package.path)),
                map((menuItems: MenuItem[]) => menuItems.forEach(menuItem => this.addItem(menuItem)))
            ).subscribe());
        });
    }

    protected setBackButton(options?: BackButtonOptions) {
        if (!options) {
            this.primaryMenuItems.push(new MenuItem('/' + this.packagePath, 'UI.MISC.BACK', 'manage', 2, 'arrowBack'));
        } else if (options.connectedPackage) {
            this.store.getCurrentPackage(this.packagePath).pipe(
                map(loadedPackage => this.primaryMenuItems.push(new MenuItem('/' + loadedPackage._package.dependencies[0], loadedPackage._package.dependencies[0], 'manage', 2, 'arrowBack'))),
                take(1)
            ).subscribe();
        } else {
            const path = options.customPath ? options.customPath : '/' + this.packagePath;
            this.primaryMenuItems.push(new MenuItem(path, 'UI.MISC.BACK', 'manage', 2, 'arrowBack'));
        }
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



