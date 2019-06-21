import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityActionProviders, ENTITY_ACTIONS_DELETE, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionsAppState, Connection, CONNECTIONS_AREA_KEY, ConnectionKey, Terminal, TerminalStatus } from '@skysmack/packages-terminal-payments';
import { NgConnectionsMenu } from '../../ng-connections-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgConnectionsFieldsConfig } from '../../ng-connections-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgConnectionsActions, NgConnectionsStore } from '@skysmack/ng-packages';
import { NgSignalR } from '@skysmack/ng-framework';
import { HttpClient } from '@angular/common/http';
import { LocalObject } from '@skysmack/framework';

@Component({
  selector: 'ss-connections-index',
  templateUrl: './connections-index.component.html'
})
export class ConnectionsIndexComponent extends RecordIndexComponent<ConnectionsAppState, Connection, ConnectionKey> implements OnInit {
  public areaKey: string = CONNECTIONS_AREA_KEY;
  public titleExtras = true;
  public entityActions: EntityAction[] = [
    new EntityAction().asEventAction('Connect', this.connection, 'add', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => {
      if (entity.object.status === TerminalStatus.Unknown) {
        return true;
      } else if (entity.object.status === TerminalStatus.Unavailable) {
        return true;
      } //... etc
    }),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgConnectionsActions,
    public redux: NgSkysmackStore,
    public store: NgConnectionsStore,
    public sidebarMenu: NgConnectionsMenu,
    public fieldsConfig: NgConnectionsFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders,
    public signalR: NgSignalR,
    public httpClient: HttpClient
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
    this.signalR.instance.join(this.packagePath);
  }

  protected connection(value: LocalObject<Connection, ConnectionKey>, _this: RecordIndexComponent<any, any, any>) {
    console.log('hello', value);
  }
}
