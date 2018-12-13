import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Skysmack } from '@skysmack/packages-skysmack';
import { Menu } from './../../../models/menu';
import { NgSkysmackStore } from './../../../../ng-packages/skysmack/redux/ng-skysmack-store';
import { UIRedux } from './../../../redux/ui-redux';
import { NgAuthenticationActions } from 'lib/ng-redux/actions/ng-authentication-actions';
import { Package } from '@skysmack/framework';

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
    public store: NgSkysmackStore,
    public uiRedux: UIRedux,
    public authenticationActions: NgAuthenticationActions,
    public translate: TranslateService,
    public skysmackStore: NgSkysmackStore
  ) { }

  ngOnInit() {
    this.skysmack$ = this.store.getSkysmack();
    this.menu$ = this.uiRedux.getMenu();
    this.authenticationPackages$ = this.skysmackStore.getAuthenticationPackages();
  }

  public toggleEditor() {
    this.uiRedux.toggleMenuFor('editors');
  }

  public logout() {
    this.authenticationActions.logout();
  }
}
