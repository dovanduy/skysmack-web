import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE, } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgRolesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgRolesStore } from '@skysmack/ng-packages';
import { Role, RolesAppState, ROLES_AREA_KEY } from '@skysmack/packages-identities';
import { NgRolesMenu } from '../../ng-roles-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgRolesFieldsConfig } from '../../ng-roles-fields-config';


@Component({
  selector: 'ss-roles-index',
  templateUrl: './roles-index.component.html'
})
export class RolesIndexComponent extends RecordIndexComponent<RolesAppState, Role, number> implements OnInit {

  public areaKey: string = ROLES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgRolesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgRolesStore,
    public sidebarMenu: NgRolesMenu,
    public fieldsConfig: NgRolesFieldsConfig,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
