import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Menu } from '@skysmack/framework';
import { UIRedux } from './../../../redux/ui-redux';
import { LoadedPackage } from '@skysmack/ng-framework';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-package-drawer',
  templateUrl: './package-drawer.component.html',
  styleUrls: ['./package-drawer.component.scss']
})
export class PackageDrawerComponent implements OnInit {
  public loadedPackages$: Observable<LoadedPackage[]>;
  public mainSectionPackages$: Observable<LoadedPackage[]>;
  public dockerSectionPackages$: Observable<LoadedPackage[]>;
  public menu$: Observable<Menu>;

  constructor(
    public skysmackStore: NgSkysmackStore,
    public uiRedux: UIRedux
  ) { }

  ngOnInit() {
    this.loadedPackages$ = this.skysmackStore.getLoadedPackages().pipe(map(loadedPackages => loadedPackages.filter(loadedPackage => loadedPackage._package.access)));
    const hasManifest$ = this.loadedPackages$.pipe(map(packages => packages.filter(_package => !!_package.packageManifest)))
    this.mainSectionPackages$ = hasManifest$.pipe(map(packages => packages.filter(_package => _package.packageManifest.menuLocation === 'main')));
    this.dockerSectionPackages$ = hasManifest$.pipe(map(packages => packages.filter(_package => _package.packageManifest.menuLocation === 'docker')));
    this.menu$ = this.uiRedux.getMenu();
  }

  public closePackageDrawer = (): void => {
    this.uiRedux.setPackageDrawerStatus(false);
  }
}
