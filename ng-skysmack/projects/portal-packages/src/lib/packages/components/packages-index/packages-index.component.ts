import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPackagesActions, NgPackagesFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgPackagesStore } from '@skysmack/ng-packages';
import { PackagesAppState } from '@skysmack/packages-skysmack-core';
import { Package, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgPackagesMenu } from './../../ng-packages-menu';
import { EntityAction } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-packages-index',
  templateUrl: './packages-index.component.html',
  styleUrls: ['./packages-index.component.scss']
})
export class PackagesIndexComponent extends RecordIndexComponent<PackagesAppState, any, string> implements OnInit {

  // TODO: Remove + replace with pagedEntities in html when pagination works for packages.
  public packages$: Observable<LocalObject<Package, string>[]>;

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
    // TODO: Remove actions.get and store.get when pagination works for packages.
    this.actions.get();
    this.packages$ = this.store.get();
    this.title.setTitle(this.packagePath);
  }
}
