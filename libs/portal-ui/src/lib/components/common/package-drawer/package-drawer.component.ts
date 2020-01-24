import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Menu } from '@skysmack/framework';
import { UIRedux } from './../../../redux/ui-redux';
import { LoadedPackage, NgAuthenticationStore } from '@skysmack/ng-framework';
import { map } from 'rxjs/operators';
import { OAuth2TypeId } from '@skysmack/package-types';

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
    public authStore: NgAuthenticationStore,
    public uiRedux: UIRedux
  ) { }

  ngOnInit() {
    // Get loaded packages
    this.loadedPackages$ = this.skysmackStore.getLoadedPackages().pipe(map(loadedPackages => loadedPackages.filter(loadedPackage => loadedPackage._package.access)));

    // Ensure only those with manifest is used.
    const hasManifest$ = this.loadedPackages$.pipe(map(packages => packages.filter(_package => !!_package.packageManifest)));

    // A stream of oauth2 packages - will contain an empty array if the user is not logged in.
    const oauth2Packages$ = combineLatest([
      hasManifest$.pipe(map(loadedPackages => loadedPackages.filter(loadedPackage => loadedPackage._package.type === OAuth2TypeId))),
      this.authStore.isCurrentUserAuthenticated()
    ]).pipe(map(([oauth2Packages, isCurrentUserAuthenticated]) => isCurrentUserAuthenticated ? [] : oauth2Packages));

    // Stream of packages belonging to the main section.
    const includeInMainSectionPackages$ = hasManifest$.pipe(map(packages => packages.filter(_package => _package.packageManifest.menuLocation === 'main')));

    // Packages to show in the main section of the package drawer.
    this.mainSectionPackages$ = combineLatest([
      oauth2Packages$,
      includeInMainSectionPackages$
    ]).pipe(map(([oauth2Packages, mainPackages]) => oauth2Packages.concat(mainPackages)));

    // Packages to show in the docker section of the package drawer.
    this.dockerSectionPackages$ = hasManifest$.pipe(map(packages => packages.filter(_package => _package.packageManifest.menuLocation === 'docker')));

    // The menu is needed to do checks if the package drawer is open/closed + some extras.
    this.menu$ = this.uiRedux.getMenu();
  }

  public closePackageDrawer = (): void => {
    this.uiRedux.setPackageDrawerStatus(false);
  }
}
