import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { Menu, MenuAreaItems, TOPBAR } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { UIRedux } from './../../../redux/ui-redux';
import { NgAuthenticationActions, NgAuthenticationStore } from '@skysmack/ng-framework';
import { Package } from '@skysmack/framework';
import { NgRedux } from '@angular-redux/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgMenuProviders } from '../../../navigation/ng-menu-providers';

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
    this.menuAreaItems$ = this.ngMenuProviders.getMenuAreaItems(packagePath, TOPBAR).pipe(
      map(menuAreaItems => {
        return menuAreaItems.filter(menuAreaItem => menuAreaItem && menuAreaItem.providedIn && menuAreaItem.providedIn.includes(TOPBAR));
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
