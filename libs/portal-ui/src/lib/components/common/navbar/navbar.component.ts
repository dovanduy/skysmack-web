import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { Menu, AllowAccessFor, MenuAreaItems } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { UIRedux } from './../../../redux/ui-redux';
import { NgAuthenticationActions, NgMenuProviders, NgAuthenticationStore } from '@skysmack/ng-framework';
import { Package } from '@skysmack/framework';
import { NgRedux } from '@angular-redux/store';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SidebarMenu } from '../../../models/sidebar-menu/sidebar-menu';

@Component({
  selector: 'ss-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {
  public skysmack$: Observable<Skysmack>;
  public menu$: Observable<Menu>;
  public authenticationPackages$: Observable<Package[]>;
  public accountPackages$: Observable<Package[]>;

  public menuAreaItems$: Observable<MenuAreaItems[]>;

  constructor(
    public uiStore: UIRedux,
    public authenticationActions: NgAuthenticationActions,
    public translate: TranslateService,
    public skysmackStore: NgSkysmackStore,
    public mainStore: NgRedux<any>,
    public ngMenuProviders: NgMenuProviders,
    public authenticationStore: NgAuthenticationStore,
    public router: Router
  ) { }

  ngOnInit() {
    this.skysmack$ = this.skysmackStore.getSkysmack();
    this.menu$ = this.uiStore.getMenu();
    this.authenticationPackages$ = this.skysmackStore.getAuthenticationPackages();
    this.accountPackages$ = this.skysmackStore.getAccountPackages();

    this.initMenu();
  }

  private initMenu() {
    const packagePath = this.router.url.split('/')[1];
    this.menuAreaItems$ = this.ngMenuProviders.providers$.pipe(
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
                  area: menuArea, items: menuItemsForArea, providedIn: menuItemsForArea.map(x => x.provideIn).filter((value, index, self) => self.indexOf(value) === index)
                })
              }
            })
          }),
        );
      })
    );
  }

  public toggleEditor() {
    this.uiStore.toggleMenuFor('editors');
  }

  public actionEvent(event: { action: Function, _this: any, value?: any }) {
    event.action(event._this, event.value);
  }
}
