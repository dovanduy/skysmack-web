import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from 'lib/ng-packages/packages/package';
import { Menu } from 'lib/portal-ui/models/menu';
import { UIRedux } from 'lib/portal-ui/redux/ui-redux';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';

@Component({
  selector: 'ss-package-drawer',
  templateUrl: './package-drawer.component.html',
  styleUrls: ['./package-drawer.component.scss']
})
export class PackageDrawerComponent implements OnInit {
  public packages$: Observable<Package[]>;
  public modules$: Observable<Package[]>;
  public menu$: Observable<Menu>;

  constructor(
    public skysmackRedux: NgSkysmackRedux,
    public uiRedux: UIRedux
  ) { }

  ngOnInit() {
    this.packages$ = this.skysmackRedux.getPackages();
    this.modules$ = this.skysmackRedux.getModules();
    this.menu$ = this.uiRedux.getMenu();
  }
}
