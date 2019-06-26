import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsAppState, Client, CLIENTS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { NgClientsMenu } from '../../ng-clients-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgClientsFieldsConfig } from '../../ng-clients-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgClientsActions, NgClientsStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-clients-index',
  templateUrl: './clients-index.component.html'
})
export class ClientsIndexComponent extends RecordIndexComponent<ClientsAppState, Client, number> implements OnInit {
  public areaKey: string = CLIENTS_AREA_KEY;
  public titleExtras = true;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgClientsActions,
    public redux: NgSkysmackStore,
    public store: NgClientsStore,
    public sidebarMenu: NgClientsMenu,
    public fieldsConfig: NgClientsFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
