import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from './../../../../ng-packages/skysmack/redux/ng-skysmack-store';
import { Menu } from './../../../models/menu';
import { UIRedux } from './../../../redux/ui-redux';
import { LoadedPackage } from './../../../../ng-packages/skysmack/packages/loaded-package';
import { map } from 'rxjs/operators';
import { Oauth2PackageManifest } from 'projects/web-portal/src/app/packages';

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
    this.loadedPackages$ = this.skysmackStore.getLoadedPackages().pipe(
      // Remove Oauth packages.
      map(packages => packages.filter(_package => _package._package.type !== Oauth2PackageManifest.id))
    );
    this.menu$ = this.uiRedux.getMenu();
  }
}
