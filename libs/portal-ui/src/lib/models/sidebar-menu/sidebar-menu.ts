import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap, filter, take, tap } from 'rxjs/operators';
import { MenuArea } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';

import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { SubscriptionHandler } from '@skysmack/framework';
import { NgMenuItemProviders, getAdditionalPaths, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { LoadedPackage } from '@skysmack/ng-framework';

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

    public primaryMenuAreas$ = new BehaviorSubject<MenuArea[]>([]);
    public primaryMenuItems$ = new BehaviorSubject<MenuItem[]>([]);

    public speedDialMenuItems$ = new BehaviorSubject<MenuItem[]>([]);
    public defaultMenuArea = 'manage';

    constructor(
        public skysmackStore: NgSkysmackStore,
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

    public addConnectedPackageMenuArea() {
        const currentValues = this.primaryMenuAreas$.getValue();

        currentValues.push(new MenuArea({
            area: 'connected_packages',
            translationPrefix: 'UI.MISC.',
            order: 1000,
        }));
        this.primaryMenuAreas$.next(currentValues);
    }

    public runMenuItemProviders() {
        this.subscriptionHandler.register(this.menuItemProviders.providers$.pipe(
            switchMap(providers => combineLatest(
                providers.map(provider => this.skysmackStore.getCurrentPackage(this.packagePath).pipe(
                    filter(loadedPackage => loadedPackage._package !== null),
                    switchMap((currentPackage: LoadedPackage) => provider.getItems(this.menuId, currentPackage._package.path)),
                    map((menuItems: MenuItem[]) => {
                        // Add provided menu items

                        const addConnectedPackageArea = (menuItem) => {
                            if (menuItem.area === 'connected_packages' && !this.primaryMenuAreas$.getValue().find(area => area.area === 'connected_packages') && (menuItem.provideIn === 'primaryMenu' || menuItem.provideIn === 'both')) {
                                this.addConnectedPackageMenuArea();
                            }
                        };

                        menuItems.forEach(menuItem => {
                            switch (menuItem.provideIn) {
                                case 'primaryMenu': {
                                    // Add the Connected Packages area if any menu items is provided, and it doesn't already exist.
                                    addConnectedPackageArea(menuItem);
                                    this.addItemToPrimaryMenu(menuItem);
                                    break;
                                }
                                case 'speedDialMenu': { this.addItemToSpeedDialMenu(menuItem); break; }
                                case 'both': {
                                    addConnectedPackageArea(menuItem);
                                    this.addItemToPrimaryMenu(menuItem);
                                    this.addItemToSpeedDialMenu(menuItem);
                                    break;
                                }
                                default: break;
                            }
                        });
                    })
                ))
            ))
        ).subscribe());
    }

    protected setBackButton(options?: BackButtonOptions): SidebarMenu {
        const currentValues = this.primaryMenuItems$.getValue();
        if (!options) {
            currentValues.push(new MenuItem({
                url: '/' + this.packagePath,
                displayName: 'UI.MISC.BACK',
                area: 'manage',
                order: 2,
                icon: 'arrowBack',
            }));
            this.primaryMenuItems$.next(currentValues);
        } else if (options.connectedPackage) {
            getPackageDendencyAsStream(this.skysmackStore, this.packagePath, options.dependencyIndexes ? options.dependencyIndexes : [0]).pipe(
                map(targetPackage => currentValues.push(new MenuItem({
                    url: '/' + targetPackage.object.path,
                    displayName: targetPackage.object.name,
                    area: 'connected_packages',
                    order: 2,
                    icon: 'arrowBack',
                }))),
                tap(() => this.primaryMenuItems$.next(currentValues)),
                take(1)
            ).subscribe()
        } else {
            const path = options.customPath ? options.customPath : '/' + this.packagePath;
            currentValues.push(new MenuItem({
                url: path,
                displayName: 'UI.MISC.BACK',
                area: 'manage',
                order: 2,
                icon: 'arrowBack',
            }));
            this.primaryMenuItems$.next(currentValues);
        }

        return this;
    }

    /**
     * Helper to primary menu areas in child classes
     */
    protected addToPrimaryMenuAreas(items: MenuArea | MenuArea[]) {
        let currentValues = this.primaryMenuAreas$.getValue();
        if (Array.isArray(items)) {
            currentValues = currentValues.concat(items)
        } else {
            currentValues.push(items);
        }
        this.primaryMenuAreas$.next(currentValues);
    }

    /**
     * Helper to set primary menu items in child classes
     */
    protected addToPrimaryMenuItems(items: MenuItem | MenuItem[]) {
        let currentValues = this.primaryMenuItems$.getValue();
        if (Array.isArray(items)) {
            currentValues = currentValues.concat(items)
        } else {
            currentValues.push(items);
        }
        this.primaryMenuItems$.next(currentValues);
    }

    /**
     * Helper to set speed dial menu items in child classes
     */
    protected addToSpeedDialMenuItems(items: MenuItem | MenuItem[]) {
        let currentValues = this.speedDialMenuItems$.getValue();
        if (Array.isArray(items)) {
            currentValues = currentValues.concat(items)
        } else {
            currentValues.push(items);
        }
        this.speedDialMenuItems$.next(currentValues);
    }

    private addItemToPrimaryMenu(item: MenuItem): void {
        const currentValues = this.primaryMenuItems$.getValue();
        if (!currentValues.find(menuItem => menuItem.displayName === item.displayName)) {
            if (!item.order) {
                item.order = 1 + currentValues.map(ma => ma.order).reduce((a, b) => Math.max(a, b));
            }
            currentValues.push(item);
            currentValues.sort((a, b) => a.order - b.order);
            this.primaryMenuItems$.next(currentValues);
        }
    }

    private addItemToSpeedDialMenu(item: MenuItem): void {
        const currentValues = this.speedDialMenuItems$.getValue();
        if (!currentValues.find(menuItem => menuItem.displayName === item.displayName)) {
            if (!item.order) {
                item.order = 1 + currentValues.map(ma => ma.order).reduce((a, b) => Math.max(a, b));
            }
            currentValues.push(item);
            currentValues.sort((a, b) => a.order - b.order);
            this.speedDialMenuItems$.next(currentValues);
        }
    }
}



