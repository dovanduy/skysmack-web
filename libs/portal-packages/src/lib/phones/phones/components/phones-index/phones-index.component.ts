import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE, MenuItemActionProviders } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { PhonesAppState, Phone, PHONES_AREA_KEY } from '@skysmack/packages-phones';
import { MenuItem } from '@skysmack/framework';
import { NgPhonesStore, NgPhonesActions } from '@skysmack/ng-phones';
import { NgPhonesFieldsConfig } from '../../ng-phones-fields-config';

@Component({
  selector: 'ss-portal-package-phones-index',
  templateUrl: './phones-index.component.html'
})
export class PhonesIndexComponent extends RecordIndexComponent<PhonesAppState, Phone, number> implements OnInit {
  public static COMPONENT_KEY = 'phones-index';
  public componentKey = PhonesIndexComponent.COMPONENT_KEY;

  public areaKey: string = PHONES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgPhonesStore,
    public actions: NgPhonesActions,
    public fieldsConfig: NgPhonesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders,
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
