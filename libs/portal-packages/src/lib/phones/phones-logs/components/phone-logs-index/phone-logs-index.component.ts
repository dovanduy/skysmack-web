import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE, MenuItemActionProviders } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { PhoneLogsAppState, PhoneLog, PHONE_LOGS_AREA_KEY } from '@skysmack/packages-phones';
import { MenuItem } from '@skysmack/framework';
import { NgPhoneLogsStore, NgPhoneLogsActions } from '@skysmack/ng-phones';
import { NgPhoneLogsFieldsConfig } from '../../ng-phone-logs-fields-config';

@Component({
  selector: 'ss-portal-package-phone-logs-index',
  templateUrl: './phone-logs-index.component.html'
})
export class PhoneLogsIndexComponent extends RecordIndexComponent<PhoneLogsAppState, PhoneLog, number> implements OnInit {
  public static COMPONENT_KEY = 'phone-logs-index';
  public componentKey = PhoneLogsIndexComponent.COMPONENT_KEY;

  public areaKey: string = PHONE_LOGS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgPhoneLogsStore,
    public actions: NgPhoneLogsActions,
    public fieldsConfig: NgPhoneLogsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders,
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
