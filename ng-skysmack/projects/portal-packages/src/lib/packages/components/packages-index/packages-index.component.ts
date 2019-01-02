import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityAction, BaseComponent } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPackagesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgPackagesStore, NgPackagesMenu } from '@skysmack/ng-packages';
import { PackagesAppState } from '@skysmack/packages';
import { Package, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-packages-index',
  templateUrl: './packages-index.component.html',
  styleUrls: ['./packages-index.component.scss']
})
export class PackagesIndexComponent extends BaseComponent<PackagesAppState, string> implements OnInit {

  public packages$: Observable<LocalObject<Package, string>[]>;

  public displayedColumns = ['name', 'path'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPackagesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgPackagesStore,
    public sidebarMenu: NgPackagesMenu
  ) {
    super(router, activatedRoute, redux);
  }

  ngOnInit() {
    super.ngOnInit();
    this.actions.get();
    this.packages$ = this.store.get();
    this.title.setTitle(this.packagePath);
  }

  public actionEvent(event: { action: Function, value: LocalObject<Package, string>, _this: any }) {
    event.action(event.value, event._this);
  }

  private delete(value: LocalObject<Package, string>, _this: PackagesIndexComponent) {
    _this.actions.delete([value]);
  }
}
