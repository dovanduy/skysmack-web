import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityAction, BaseComponent } from 'lib/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgPackagesActions } from 'lib/ng-packages/packages/redux/ng-packages-actions';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack';
import { NgPackagesStore, NgPackagesMenu } from 'lib/ng-packages/packages';
import { PackagesAppState } from '@skysmack/packages';
import { Package, LocalObject } from '@skysmack/framework';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'ss-packages-index',
  templateUrl: './packages-index.component.html',
  styleUrls: ['./packages-index.component.scss']
})
export class PackagesIndexComponent extends BaseComponent<PackagesAppState, string> implements OnInit {

  public packages$: Observable<LocalObject<Package>> = of<LocalObject<Package>>([] as any);

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
    this.title.setTitle(this.packagePath);
  }

  private delete(value: LocalObject<Package>, _this: PackagesIndexComponent) {
    // TODO: Incomment below when delete is defined
    // _this.actions.delete([value], _this.packagePath);
  }
}
