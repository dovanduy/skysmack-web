import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from './../../../../ng-packages/skysmack/redux/ng-skysmack-store';
import { Menu } from './../../../models/menu';
import { UIRedux } from './../../../redux/ui-redux';
import { Package } from 'lib/ng-packages/skysmack/packages/package';

@Component({
  selector: 'ss-package-drawer',
  templateUrl: './package-drawer.component.html',
  styleUrls: ['./package-drawer.component.scss']
})
export class PackageDrawerComponent implements OnInit {
  public packages$: Observable<Package[]>;
  public menu$: Observable<Menu>;

  constructor(
    public skysmackStore: NgSkysmackStore,
    public uiRedux: UIRedux
  ) { }

  ngOnInit() {
    this.packages$ = this.skysmackStore.getPackages();
    this.menu$ = this.uiRedux.getMenu();
  }
}
