import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTION_DETAILS, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgTerminalReceiptsStore, NgTerminalReceiptsActions } from '@skysmack/ng-terminal-payments';
import { TerminalReceipt, TerminalReceiptsAppState, TERMINAL_RECEIPTS_AREA_KEY, TerminalPaymentsPermissions } from '@skysmack/packages-terminal-payments';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgTerminalReceiptsFieldsConfig } from '../../ng-terminal-receipts-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-terminal-receipts-index',
  templateUrl: './terminal-receipts-index.component.html'
})
export class TerminalReceiptsIndexComponent extends DocumentRecordIndexComponent<TerminalReceiptsAppState, TerminalReceipt, number> implements OnInit {
  public static COMPONENT_KEY = 'terminal-receipts-index';
  public componentKey = TerminalReceiptsIndexComponent.COMPONENT_KEY;

  public areaKey: string = TERMINAL_RECEIPTS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('details', MENU_ITEM_ACTION_DETAILS, 'list'),
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit').setPermissions([
      TerminalPaymentsPermissions.updateTerminalReceipts,
    ]),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this).setPermissions([
      TerminalPaymentsPermissions.removeTerminalReceipts,
    ])
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgTerminalReceiptsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgTerminalReceiptsStore,
    public fieldsConfig: NgTerminalReceiptsFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
