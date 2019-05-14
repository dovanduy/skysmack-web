import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentTypesAppState, AssignmentType, ASSIGNMENT_TYPES_AREA_KEY } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgAssignmentTypesActions, NgAssignmentTypesStore } from '@skysmack/ng-packages';
import { NgAssignmentTypesMenu } from '../../ng-assignment-types-menu';
import { NgAssignmentTypesFieldsConfig } from '../../ng-assignment-types-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-assignment-types-index',
  templateUrl: './assignment-types-index.component.html'
})
export class AssignmentTypesIndexComponent extends RecordIndexComponent<AssignmentTypesAppState, AssignmentType, number> implements OnInit {

  public areaKey: string = ASSIGNMENT_TYPES_AREA_KEY;
  public titleExtras = true;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAssignmentTypesActions,
    public redux: NgSkysmackStore,
    public store: NgAssignmentTypesStore,
    public sidebarMenu: NgAssignmentTypesMenu,
    public fieldsConfig: NgAssignmentTypesFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
