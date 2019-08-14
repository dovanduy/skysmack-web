import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgTerminalPaymentReceiptsStore, NgTerminalPaymentReceiptsActions } from '@skysmack/ng-terminal-payments';
import { TerminalPaymentReceipt, TerminalPaymentReceiptsAppState, TERMINAL_PAYMENT_RECEIPTS_AREA_KEY, TerminalPaymentsPermissions } from '@skysmack/packages-terminal-payments';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgTerminalPaymentReceiptsFieldsConfig } from '../../ng-terminal-payment-receipts-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-terminal-payment-receipts-index',
  templateUrl: './terminal-payment-receipts-index.component.html'
})
export class TerminalPaymentReceiptsIndexComponent extends DocumentRecordIndexComponent<TerminalPaymentReceiptsAppState, TerminalPaymentReceipt, number> implements OnInit {
  public static COMPONENT_KEY = 'terminal-payment-receipts-index';
  public componentKey = TerminalPaymentReceiptsIndexComponent.COMPONENT_KEY;

  public areaKey: string = TERMINAL_PAYMENT_RECEIPTS_AREA_KEY;
  public titleExtras = true;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit').setPermissions([
      TerminalPaymentsPermissions.updateTerminalPaymentReceipts,
    ]),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this).setPermissions([
      TerminalPaymentsPermissions.removeTerminalPaymentReceipts,
    ])
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgTerminalPaymentReceiptsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgTerminalPaymentReceiptsStore,
    public fieldsConfig: NgTerminalPaymentReceiptsFieldsConfig,
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
