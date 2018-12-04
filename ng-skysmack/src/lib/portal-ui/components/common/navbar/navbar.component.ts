import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CurrentTenantViewModel } from '@skysmack/packages-skysmack';
import { Menu } from './../../../models/menu';
import { NgSkysmackStore } from './../../../../ng-packages/skysmack/redux/ng-skysmack-store';
import { AuthUserRedux } from './../../../redux/authenticated-user/auth-user-redux';
import { UIRedux } from './../../../redux/ui-redux';

@Component({
  selector: 'ss-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  public currentTenant: Observable<CurrentTenantViewModel>;
  public menu: Observable<Menu>;

  constructor(
    public redux: NgSkysmackStore,
    public uiRedux: UIRedux,
    public authUserRedux: AuthUserRedux,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.currentTenant = this.redux.getCurrentTenant();
    this.menu = this.uiRedux.getMenu();
  }

  public toggleEditor(id: string) {
    this.uiRedux.toggleMenuFor('editors');
  }
}
