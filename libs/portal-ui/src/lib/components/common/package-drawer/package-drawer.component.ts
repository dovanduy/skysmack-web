import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { Menu } from '@skysmack/ng-ui';
import { UIRedux } from './../../../redux/ui-redux';
import { map } from 'rxjs/operators';
import { Oauth2Type } from '@skysmack/packages-oauth2';
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
    this.loadedPackages$ = this.skysmackStore.getLoadedPackages().pipe(
      // Remove Oauth packages.
      map(packages => packages.filter(_package => _package._package.access).filter(_package => _package._package.type !== Oauth2Type.id))
    );
    this.menu$ = this.uiRedux.getMenu();
  }

  public trackById(index: any, item: any) {
    return item.id;
  }
}
