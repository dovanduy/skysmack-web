import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPackagesActions, NgPackagesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { PackagesAppState, PACKAGES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgPackagesMenu } from './../../ng-packages-menu';
import { MenuItem, LocalObject } from '@skysmack/framework';
import { NgPackagesFieldsConfig } from '../../ng-packages-fields-config';
import { Package } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-packages-index',
  templateUrl: './packages-index.component.html'
})
export class PackagesIndexComponent extends RecordIndexComponent<PackagesAppState, Package, string> implements OnInit {
  public static COMPONENT_KEY = 'packages-index';
  public componentKey = PackagesIndexComponent.COMPONENT_KEY;

  public areaKey: string = PACKAGES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(`open`, this.openPackage, 'label', this),
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asUrlAction('edit/path', 'PACKAGES.EDIT.PACKAGE_PATH', 'link'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPackagesActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgPackagesStore,
    public sidebarMenu: NgPackagesMenu,
    public fieldsConfig: NgPackagesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public openPackage(_this: PackagesIndexComponent, entity: LocalObject<Package, string>) {
    _this.router.navigateByUrl(entity.object.path);
  }

}
