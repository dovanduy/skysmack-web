import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SingleAssignmentsAppState, SINGLE_ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';
import { SingleAssignment } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { MenuItem } from '@skysmack/framework';
import { NgSingleAssignmentsActions, NgSingleAssignmentsStore, NgAssignmentTypesStore, NgAssignmentTypesActions } from '@skysmack/ng-maintenance';
import { NgSingleAssignmentsFieldsConfig } from '../../ng-single-assignments-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-single-assignments-index',
  templateUrl: './single-assignments-index.component.html'
})
export class SingleAssignmentsIndexComponent extends RecordIndexComponent<SingleAssignmentsAppState, SingleAssignment, number> implements OnInit {
  public static COMPONENT_KEY = 'single-assignments-index';
  public componentKey = SingleAssignmentsIndexComponent.COMPONENT_KEY;

  public areaKey: string = SINGLE_ASSIGNMENTS_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgSingleAssignmentsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgSingleAssignmentsStore,
    public fieldsConfig: NgSingleAssignmentsFieldsConfig,
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
