import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Skysmack } from '@skysmack/packages-skysmack';
import { Menu } from './../../../models/menu';
import { NgSkysmackStore } from './../../../../ng-packages/skysmack/redux/ng-skysmack-store';
import { UIRedux } from './../../../redux/ui-redux';
import { NgAuthenticationActions } from 'lib/ng-packages/authentication';

@Component({
  selector: 'ss-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  public skysmack: Observable<Skysmack>;
  public menu: Observable<Menu>;

  constructor(
    public store: NgSkysmackStore,
    public uiRedux: UIRedux,
    public authenticationActions: NgAuthenticationActions,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.skysmack = this.store.getSkysmack();
    this.menu = this.uiRedux.getMenu();
  }

  public toggleEditor(id: string) {
    this.uiRedux.toggleMenuFor('editors');
  }

  public logout() {
    this.authenticationActions.logout();
  }
}
