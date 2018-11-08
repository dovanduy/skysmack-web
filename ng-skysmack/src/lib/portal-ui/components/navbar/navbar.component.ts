import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CurrentTenantViewModel } from '@skysmack/packages-skysmack';
import { Menu, UIRedux, AuthUserRedux } from 'lib/portal-ui';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';

@Component({
  selector: 'ss-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  public currentTenant: Observable<CurrentTenantViewModel>;
  public menu: Observable<Menu>;

  constructor(
    public redux: NgSkysmackRedux,
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
