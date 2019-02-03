import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { Menu } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { UIRedux } from './../../../redux/ui-redux';
import { NgAuthenticationActions } from '@skysmack/ng-redux';
import { Package } from '@skysmack/framework';
import { NgRedux } from '@angular-redux/store';
import { persistStore } from 'redux-persist';

@Component({
  selector: 'ss-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  public skysmack$: Observable<Skysmack>;
  public menu$: Observable<Menu>;
  public authenticationPackages$: Observable<Package[]>;

  constructor(
    public uiStore: UIRedux,
    public authenticationActions: NgAuthenticationActions,
    public translate: TranslateService,
    public skysmackStore: NgSkysmackStore,
    public mainStore: NgRedux<any>
  ) { }

  ngOnInit() {
    this.skysmack$ = this.skysmackStore.getSkysmack();
    this.menu$ = this.uiStore.getMenu();
    this.authenticationPackages$ = this.skysmackStore.getAuthenticationPackages();
  }

  public toggleEditor() {
    this.uiStore.toggleMenuFor('editors');
  }

  public logout() {
    const persistor = persistStore(this.mainStore);
    persistor.purge();
    this.authenticationActions.logout();
  }
}
