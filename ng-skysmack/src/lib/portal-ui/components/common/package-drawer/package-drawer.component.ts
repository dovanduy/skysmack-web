import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from 'lib/ng-packages/packages/package';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { Menu } from './../../../models/menu';
import { UIRedux } from './../../../redux/ui-redux';

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
