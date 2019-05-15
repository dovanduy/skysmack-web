import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { Menu } from '@skysmack/ng-ui';
import { UIRedux } from './../../../redux/ui-redux';
import { LoadedPackage } from '@skysmack/ng-redux';

@Component({
  selector: 'ss-package-drawer',
  templateUrl: './package-drawer.component.html',
  styleUrls: ['./package-drawer.component.scss']
})
export class PackageDrawerComponent implements OnInit {
  public loadedPackages$: Observable<LoadedPackage[]>;
  public menu$: Observable<Menu>;

  constructor(
    public skysmackStore: NgSkysmackStore,
    public uiRedux: UIRedux
  ) { }

  ngOnInit() {
    this.loadedPackages$ = this.skysmackStore.getLoadedPackages();
    this.menu$ = this.uiRedux.getMenu();
  }
}
