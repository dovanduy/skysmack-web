import { Component, OnInit } from '@angular/core';
import { AuthUserRedux, FrameworkRedux } from 'framework';
import { Observable } from 'rxjs';
import { CurrentTenantViewModel } from 'skysmack-api';
import { Menu } from 'ui/models/menu';
import { UIRedux } from 'ui/redux/ui-redux';
import { environment } from 'environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ss-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  public currentTenant: Observable<CurrentTenantViewModel>;
  public menu: Observable<Menu>;
  public production: boolean = environment.production;

  constructor(
    public frameworkRedux: FrameworkRedux,
    public uiRedux: UIRedux,
    public authUserRedux: AuthUserRedux,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.currentTenant = this.frameworkRedux.getCurrentTenant();
    this.menu = this.uiRedux.getMenu();
  }

  public toggleEditor(id: string) {
    this.uiRedux.toggleMenuFor('editors');
  }
}
