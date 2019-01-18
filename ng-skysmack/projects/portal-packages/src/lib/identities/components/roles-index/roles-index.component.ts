import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgRolesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgRolesStore } from '@skysmack/ng-packages';
import { Role, RolesAppState } from '@skysmack/packages-identities';
import { NgRolesMenu } from './../../ng-roles-menu';
import { EntityAction } from '@skysmack/ng-ui';


@Component({
  selector: 'ss-roles-index',
  templateUrl: './roles-index.component.html',
  styleUrls: ['./roles-index.component.scss']
})
export class RolesIndexComponent extends RecordIndexComponent<RolesAppState, Role, number> implements OnInit {

  public displayedColumns = ['name'];
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgRolesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgRolesStore,
    public sidebarMenu: NgRolesMenu
  ) {
    super(router, activatedRoute, actions, redux, store);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}