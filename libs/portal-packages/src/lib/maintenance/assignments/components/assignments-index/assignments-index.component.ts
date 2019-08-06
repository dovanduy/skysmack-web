import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentsAppState, ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';
import { Assignment } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { MenuItem } from '@skysmack/framework';
import { NgAssignmentsActions, NgAssignmentsStore, NgAssignmentTypesStore, NgAssignmentTypesActions } from '@skysmack/ng-maintenance';
import { NgAssignmentsMenu } from '../../ng-assignments-menu';
import { NgAssignmentsFieldsConfig } from '../../ng-assignments-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-assignments-index',
  templateUrl: './assignments-index.component.html'
})
export class AssignmentsIndexComponent extends RecordIndexComponent<AssignmentsAppState, Assignment, number> implements OnInit {
  public static COMPONENT_KEY = 'assignments-index';
  public componentKey = AssignmentsIndexComponent.COMPONENT_KEY;

  public areaKey: string = ASSIGNMENTS_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAssignmentsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgAssignmentsStore,
    public sidebarMenu: NgAssignmentsMenu,
    public fieldsConfig: NgAssignmentsFieldsConfig,
    public assignmentTypesStore: NgAssignmentTypesStore,
    public assignmentTypesActions: NgAssignmentTypesActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
    this.assignmentTypesActions.getPaged(this.packagePath, this.pagedQuery);
  }
}
