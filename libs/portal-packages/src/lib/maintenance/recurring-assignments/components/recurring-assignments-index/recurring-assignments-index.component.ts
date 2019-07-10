import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecurringAssignment, RecurringAssignmentsAppState, RECURRING_ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { MenuItem } from '@skysmack/framework';
import { NgRecurringAssignmentsActions, NgRecurringAssignmentsStore } from '@skysmack/ng-packages';
import { NgRecurringAssignmentsMenu } from '../../ng-recurring-assignments-menu';
import { NgRecurringAssignmentsFieldsConfig } from '../../ng-recurring-assignments-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-recurring-assignments-index',
  templateUrl: './recurring-assignments-index.component.html'
})
export class RecurringAssignmentsIndexComponent extends RecordIndexComponent<RecurringAssignmentsAppState, RecurringAssignment, number> implements OnInit {

  public areaKey: string = RECURRING_ASSIGNMENTS_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgRecurringAssignmentsActions,
    public redux: NgSkysmackStore,
    public store: NgRecurringAssignmentsStore,
    public sidebarMenu: NgRecurringAssignmentsMenu,
    public fieldsConfig: NgRecurringAssignmentsFieldsConfig,
    public menuItemActionProviders: MenuItemActionProviders,
    public title: EntityComponentPageTitle


  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
