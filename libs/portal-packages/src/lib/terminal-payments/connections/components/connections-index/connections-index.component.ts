import { Component, OnInit, Inject } from '@angular/core';
import { EntityComponentPageTitle, EntityActionProviders, ENTITY_ACTIONS_DELETE, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionsAppState, Connection, CONNECTIONS_AREA_KEY, ConnectionKey, Terminal, TerminalStatus, ConnectionRequest, TerminalAction } from '@skysmack/packages-terminal-payments';
import { NgConnectionsMenu } from '../../ng-connections-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgConnectionsFieldsConfig } from '../../ng-connections-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgConnectionsActions, NgConnectionsStore } from '@skysmack/ng-packages';
import { HttpClient } from '@angular/common/http';
import { LocalObject, API_DOMAIN_INJECTOR_TOKEN, ApiDomain } from '@skysmack/framework';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'ss-connections-index',
  templateUrl: './connections-index.component.html'
})
export class ConnectionsIndexComponent extends RecordIndexComponent<ConnectionsAppState, Connection, ConnectionKey> implements OnInit {
  public areaKey: string = CONNECTIONS_AREA_KEY;
  public titleExtras = true;
  public entityActions: EntityAction[] = [
    new EntityAction().asEventAction('Connect', this.connect, 'control_point', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => {
      if (entity.object.client && entity.object.client.object.online) {
        if (entity.object.status == TerminalStatus.Closed || entity.object.status == TerminalStatus.Disconnected || entity.object.status == TerminalStatus.Unknown) {
          return true;
        }
      }
      return false;
    }),
    new EntityAction().asEventAction('Open', this.open, 'check', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => {
      if (entity.object.client && entity.object.client.object.online) {
        if (entity.object.status == TerminalStatus.Closed || entity.object.status == TerminalStatus.Disconnected || entity.object.status == TerminalStatus.Connected || entity.object.status == TerminalStatus.Unknown) {
          return true;
        }
      }
      return false;
    }),
    new EntityAction().asEventAction('Close', this.close, 'close', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => {
      if (entity.object.client && entity.object.client.object.online) {
        if (entity.object.status == TerminalStatus.Open || entity.object.status == TerminalStatus.Connected) {
          return true;
        }
      }
      return false;
    }),
    new EntityAction().asEventAction('Disconnect', this.disconnect, 'cancel', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => {
      if (entity.object.client && entity.object.client.object.online) {
        if (entity.object.status == TerminalStatus.Open || entity.object.status == TerminalStatus.Connected || entity.object.status == TerminalStatus.Closed) {
          return true;
        }
      }
      return false;
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
    public httpClient: HttpClient,
    @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain

  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected connect(value: LocalObject<Connection, ConnectionKey>, _this: ConnectionsIndexComponent) {
    const url = `${_this.apiDomain.domain}/${_this.packagePath}`;
    const connection = new ConnectionRequest({
      type: 'changeConnection',
      clientId: value.object.id.clientId,
      terminalId: value.object.id.terminalId,
      terminalAction: TerminalAction.Connect
    });

    _this.httpClient.post(`${url}/actions/change-connection`, connection, { observe: 'response' }).pipe(take(1)).subscribe();
  }

  protected open(value: LocalObject<Connection, ConnectionKey>, _this: ConnectionsIndexComponent) {
    const url = `${_this.apiDomain.domain}/${_this.packagePath}`;
    const connection = new ConnectionRequest({
      type: 'changeConnection',
      clientId: value.object.id.clientId,
      terminalId: value.object.id.terminalId,
      terminalAction: TerminalAction.Open
    });

    _this.httpClient.post(`${url}/actions/change-connection`, connection, { observe: 'response' }).pipe(
      take(1)
    ).subscribe();
  }

  protected close(value: LocalObject<Connection, ConnectionKey>, _this: ConnectionsIndexComponent) {
    const url = `${_this.apiDomain.domain}/${_this.packagePath}`;
    const connection = new ConnectionRequest({
      type: 'changeConnection',
      clientId: value.object.id.clientId,
      terminalId: value.object.id.terminalId,
      terminalAction: TerminalAction.Close
    });

    _this.httpClient.post(`${url}/actions/change-connection`, connection, { observe: 'response' }).pipe(
      take(1)
    ).subscribe();
  }

  protected disconnect(value: LocalObject<Connection, ConnectionKey>, _this: ConnectionsIndexComponent) {
    const url = `${_this.apiDomain.domain}/${_this.packagePath}`;
    const connection = new ConnectionRequest({
      type: 'changeConnection',
      clientId: value.object.id.clientId,
      terminalId: value.object.id.terminalId,
      terminalAction: TerminalAction.Disconnect
    });

    _this.httpClient.post(`${url}/actions/change-connection`, connection, { observe: 'response' }).pipe(
      take(1)
    ).subscribe();
  }
}
