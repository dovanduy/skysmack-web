import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgWorkflowsActions, NgWorkflowsStore } from '@skysmack/ng-workflows';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Workflow, WorkflowsAppState, WORKFLOWS_AREA_KEY } from '@skysmack/packages-workflows';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgWorkflowsFieldsConfig } from '../../ng-workflows-fields-config';

@Component({
  selector: 'ss-workflows-index',
  templateUrl: './workflows-index.component.html'
})
export class WorkflowsIndexComponent extends RecordIndexComponent<WorkflowsAppState, Workflow, number> implements OnInit {
  public static COMPONENT_KEY = 'workflows-index';
  public componentKey = WorkflowsIndexComponent.COMPONENT_KEY;

  public areaKey: string = WORKFLOWS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgWorkflowsActions,
    public redux: NgSkysmackStore,
    public store: NgWorkflowsStore,
    public fieldsConfig: NgWorkflowsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
