import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTION_DETAILS, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgPassCodesStore, NgPassCodesActions } from '@skysmack/ng-pass-codes';
import { PassCode, PassCodesAppState, PASS_CODES_AREA_KEY, PassCodesPermissions } from '@skysmack/packages-pass-codes';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgPassCodesFieldsConfig } from '../../../ng-pass-codes-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-pass-codes-index',
  templateUrl: './pass-codes-index.component.html'
})
export class PassCodesIndexComponent extends DocumentRecordIndexComponent<PassCodesAppState, PassCode, number> implements OnInit {
  public static COMPONENT_KEY = 'pass-codes-index';
  public componentKey = PassCodesIndexComponent.COMPONENT_KEY;

  public areaKey: string = PASS_CODES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('details', MENU_ITEM_ACTION_DETAILS, 'list').setPermissions([PassCodesPermissions.findPassCodes]),
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit').setPermissions([
      PassCodesPermissions.updatePassCodes,
    ]),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this).setPermissions([
      PassCodesPermissions.removePassCodes,
    ])
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgPassCodesActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgPassCodesStore,
    public fieldsConfig: NgPassCodesFieldsConfig,
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
