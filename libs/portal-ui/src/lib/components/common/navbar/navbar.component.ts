import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { Menu, MenuArea, MenuItem, SubscriptionHandler } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { UIRedux } from './../../../redux/ui-redux';
import { NgAuthenticationActions, NgMenuItemProviders, NgMenuProviders } from '@skysmack/ng-framework';
import { Package } from '@skysmack/framework';
import { NgRedux } from '@angular-redux/store';
import { persistStore } from 'redux-persist';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { SidebarMenu } from '../../../models';

@Component({
  selector: 'ss-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  public skysmack$: Observable<Skysmack>;
  public menu$: Observable<Menu>;
  public authenticationPackages$: Observable<Package[]>;
  public accountPackages$: Observable<Package[]>;

  public menuAreas$: Observable<MenuArea[]>;
  public menuItems$: Observable<MenuItem[]>;

  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    public uiStore: UIRedux,
    public authenticationActions: NgAuthenticationActions,
    public translate: TranslateService,
    public skysmackStore: NgSkysmackStore,
    public mainStore: NgRedux<any>,
    public ngMenuProviders: NgMenuProviders
  ) { }

  ngOnInit() {
    this.skysmack$ = this.skysmackStore.getSkysmack();
    this.menu$ = this.uiStore.getMenu();
    this.authenticationPackages$ = this.skysmackStore.getAuthenticationPackages();
    this.accountPackages$ = this.skysmackStore.getAccountPackages();

    this.initMenu();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  private initMenu() {
    this.menuAreas$ = this.ngMenuProviders.providers$.pipe(
      switchMap((menus: SidebarMenu[]) => {
        return combineLatest(menus.map(menu => menu.navbarMenuAreas$));
      }),
      map(x => x.reduce((a, b) => a.concat(b), []))
    );

    this.menuItems$ = this.ngMenuProviders.providers$.pipe(
      switchMap((menus: SidebarMenu[]) => {
        return combineLatest(menus.map(menu => menu.navbarMenuItems$));
      }),
      map(x => x.reduce((a, b) => a.concat(b), []))
    );
  }

  /**
   * COPIED FROM sidebar-component.ts (modified a bit)
   */
  public permissionsChecked(displaying: boolean, menuItem: MenuItem) {
    menuItem.display = displaying;
    this.subscriptionHandler.register(this.menuAreas$.pipe(
      take(1),
      map(currentValues => {
        const menuArea = currentValues.find(x => x.area === menuItem.area);
        menuArea.display = currentValues.filter(x => x.area === menuItem.area && x.display).length > 0;
      }),
    ).subscribe());
  }

  public toggleEditor() {
    this.uiStore.toggleMenuFor('editors');
  }

  public actionEvent(event: { action: Function, _this: any, value?: any }) {
    event.action(event._this, event.value);
  }

  public logout() {
    const persistor = persistStore(this.mainStore);
    persistor.purge();
    this.authenticationActions.logout();
  }
}
