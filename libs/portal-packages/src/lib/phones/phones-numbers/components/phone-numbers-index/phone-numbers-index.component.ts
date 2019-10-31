import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE, MenuItemActionProviders } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { PhoneNumbersAppState, PhoneNumber, PHONE_NUMBERS_AREA_KEY } from '@skysmack/packages-phones';
import { MenuItem } from '@skysmack/framework';
import { NgPhoneNumbersStore, NgPhoneNumbersActions } from '@skysmack/ng-phones';
import { NgPhoneNumbersFieldsConfig } from '../../ng-phone-numbers-fields-config';

@Component({
  selector: 'ss-portal-package-phone-numbers-index',
  templateUrl: './phone-numbers-index.component.html'
})
export class PhoneNumbersIndexComponent extends RecordIndexComponent<PhoneNumbersAppState, PhoneNumber, number> implements OnInit {
  public static COMPONENT_KEY = 'phone-numbers-index';
  public componentKey = PhoneNumbersIndexComponent.COMPONENT_KEY;

  public areaKey: string = PHONE_NUMBERS_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgPhoneNumbersStore,
    public actions: NgPhoneNumbersActions,
    public fieldsConfig: NgPhoneNumbersFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders,
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
