import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, filter, take, tap } from 'rxjs/operators';
import { MenuArea, hasValue } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';

import { NgSkysmackStore } from '@skysmack/ng-core';
import { SubscriptionHandler } from '@skysmack/framework';
import { NgMenuItemProviders, getAdditionalPaths, getNParentPackageDependency } from '@skysmack/ng-redux';
import { combineLatest } from 'rxjs';
import { LoadedPackage } from '@skysmack/ng-redux';

interface BackButtonOptions {
    connectedPackage?: boolean;
    dependencyIndexes?: number[];
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
        this.subscriptionHandler.register(this.menuItemProviders.providers$.pipe(
            switchMap(providers => combineLatest(
                providers.map(provider => this.store.getCurrentPackage(this.packagePath).pipe(
                    filter(loadedPackage => loadedPackage._package !== null),
                    switchMap((currentPackage: LoadedPackage) => provider.getItems(this.menuId, currentPackage._package.path)),
                    map((menuItems: MenuItem[]) => menuItems.forEach(menuItem => this.addItem(menuItem)))
                ))
            ))
        ).subscribe());
    }

    protected setBackButton(options?: BackButtonOptions) {
        if (!options) {
            this.primaryMenuItems.push(new MenuItem({
                url: '/' + this.packagePath,
                displayName: 'UI.MISC.BACK',
                area: 'manage',
                order: 2,
                icon: 'arrowBack',
            }));
        } else if (options.connectedPackage) {
            combineLatest(
                this.store.getPackages(),
                this.store.getCurrentPackage(this.packagePath)
            ).pipe(
                map(([packages, currentPackage]) => getNParentPackageDependency(packages, currentPackage._package, options.dependencyIndexes ? options.dependencyIndexes : [0])),
                map(targetPackage => this.primaryMenuItems.push(new MenuItem({
                    url: '/' + targetPackage.object.path,
                    displayName: targetPackage.object.name,
                    area: 'connected_packages',
                    order: 2,
                    icon: 'arrowBack',
                }))),
                take(1)
            ).subscribe()
        } else {
            const path = options.customPath ? options.customPath : '/' + this.packagePath;
            this.primaryMenuItems.push(new MenuItem({
                url: path,
                displayName: 'UI.MISC.BACK',
                area: 'manage',
                order: 2,
                icon: 'arrowBack',
            }));
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



