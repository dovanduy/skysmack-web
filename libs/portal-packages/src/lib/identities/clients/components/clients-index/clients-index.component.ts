import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from '@skysmack/framework';
import { NgClientsFieldsConfig } from '../../ng-clients-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { ClientsAppState, Client, CLIENTS_AREA_KEY } from '@skysmack/packages-identities';
import { NgClientsActions, NgClientsStore } from '@skysmack/ng-identities';

@Component({
  selector: 'ss-clients-index',
  templateUrl: './clients-index.component.html'
})
export class ClientsIndexComponent extends RecordIndexComponent<ClientsAppState, Client, string> implements OnInit {
  public static COMPONENT_KEY = 'clients-index';
  public componentKey = ClientsIndexComponent.COMPONENT_KEY;
  public areaKey: string = CLIENTS_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgClientsActions,
    public redux: NgSkysmackStore,
    public store: NgClientsStore,
    public fieldsConfig: NgClientsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
