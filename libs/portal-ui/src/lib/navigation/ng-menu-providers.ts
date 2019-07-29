import { Injectable } from '@angular/core';
import { MenuProviders, MenuAreaItems, AllowAccessFor } from '@skysmack/framework';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { switchMap, map } from 'rxjs/operators';
import { NgAuthenticationStore } from '@skysmack/ng-framework';
import { SidebarMenu } from '../models/sidebar-menu/sidebar-menu';

@Injectable({ providedIn: 'root' })
export class NgMenuProviders extends MenuProviders {
    constructor(public router: Router,
        public skysmackStore: NgSkysmackStore,
        public authenticationStore: NgAuthenticationStore) {
        super();
    }

    public getMenuAreaItems(packagePath: string, componentKey: string): Observable<MenuAreaItems[]> {
        return this.providers$.pipe(
            switchMap((menus: SidebarMenu[]) => {
                const menuAreas = combineLatest(menus.map(menu => menu.navbarMenuAreas$)).pipe(map(x => x.reduce((a, b) => a.concat(b), [])));
                const menuItems = combineLatest(menus.map(menu => menu.navbarMenuItems$)).pipe(
                    map(x => x.reduce((a, b) => a.concat(b), [])),
                    // Filter menu items based on authentication
                    switchMap(menuItems => this.authenticationStore.isCurrentUserAuthenticated().pipe(
                        map(authenticated => {
                            return menuItems.filter(menuItem => {
                                if (menuItem.allowAccessFor === AllowAccessFor.anonymous) {
                                    return !authenticated;
                                } else if (menuItem.allowAccessFor === AllowAccessFor.authenticated) {
                                    return authenticated;
                                }
                                return true;
                            })
                        })
                    )),
                    // Filter menu items based on permissions
                    switchMap(menuItems => this.skysmackStore.getPermissions(packagePath).pipe(
                        map(allPermissions => {
                            if (allPermissions && allPermissions.length > 0) {
                                return menuItems.filter(menuItem => {
                                    if (menuItem.permissions && menuItem.permissions.length > 0) {
                                        for (let index = 0; index < menuItem.permissions.length; index++) {
                                            if (allPermissions.includes(menuItem.permissions[index])) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    }
                                    return true;
                                })
                            }
                            return menuItems;
                        })
                    ))
                );

                return combineLatest(
                    menuAreas,
                    menuItems
                ).pipe(
                    map(([menuAreas, menuItems]) => {
                        // Filter away duplicate and empty (no menu items) menu areas
                        return menuAreas.filter((value, index, self) => self.map(x => x.area).indexOf(value.area) === index).map(menuArea => {
                            const menuItemsForArea = menuItems.filter(menuItem => {
                                return menuItem.area === menuArea.area;
                            });
                            if (menuItemsForArea && menuItemsForArea.length > 0) {
                                return new MenuAreaItems({
                                    area: menuArea, items: menuItemsForArea, providedIn: menuItemsForArea.map(x => x.providedIn).reduce((a, b) => a.concat(b), []).filter((value, index, self) => value && self.indexOf(value) === index)
                                });
                            }
                        })
                    }),
                );
            })
        );
    }
}
