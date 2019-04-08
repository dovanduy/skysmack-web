import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPackagesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgPackagesStore } from '@skysmack/ng-packages';
import { PackagesAppState, PACKAGES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgPackagesMenu } from './../../ng-packages-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgPackagesFieldsConfig } from '../../ng-packages-fields-config';

@Component({
  selector: 'ss-packages-index',
  templateUrl: './packages-index.component.html'
})
export class PackagesIndexComponent extends RecordIndexComponent<PackagesAppState, any, string> implements OnInit {
  public area: string = PACKAGES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPackagesActions,
    public skysmackStore: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgPackagesStore,
    public sidebarMenu: NgPackagesMenu,
    public fieldsConfig: NgPackagesFieldsConfig
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.actions.getAvailablePackages();
    this.title.setTitle(this.packagePath);
  }
}
