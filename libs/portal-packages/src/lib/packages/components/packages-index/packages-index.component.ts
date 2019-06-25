import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPackagesActions } from '@skysmack/ng-core';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgPackagesStore } from '@skysmack/ng-core';
import { PackagesAppState, PACKAGES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgPackagesMenu } from './../../ng-packages-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgPackagesFieldsConfig } from '../../ng-packages-fields-config';
import { Package } from '@skysmack/framework';

@Component({
  selector: 'ss-packages-index',
  templateUrl: './packages-index.component.html'
})
export class PackagesIndexComponent extends RecordIndexComponent<PackagesAppState, Package, string> implements OnInit {
  public areaKey: string = PACKAGES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asUrlAction('edit/path', 'PACKAGES.EDIT.PACKAGE_PATH', 'link'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
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
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
