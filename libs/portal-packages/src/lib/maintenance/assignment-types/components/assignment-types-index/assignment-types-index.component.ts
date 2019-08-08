import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentTypesAppState, AssignmentType, ASSIGNMENT_TYPES_AREA_KEY } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { MenuItem } from '@skysmack/framework';
import { NgAssignmentTypesActions, NgAssignmentTypesStore } from '@skysmack/ng-maintenance';
import { NgAssignmentTypesFieldsConfig } from '../../ng-assignment-types-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-assignment-types-index',
  templateUrl: './assignment-types-index.component.html'
})
export class AssignmentTypesIndexComponent extends RecordIndexComponent<AssignmentTypesAppState, AssignmentType, number> implements OnInit {
  public static COMPONENT_KEY = 'assignment-types-index';
  public componentKey = AssignmentTypesIndexComponent.COMPONENT_KEY;

  public areaKey: string = ASSIGNMENT_TYPES_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAssignmentTypesActions,
    public redux: NgSkysmackStore,
    public store: NgAssignmentTypesStore,
    public fieldsConfig: NgAssignmentTypesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
