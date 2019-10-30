import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionsAppState, Connection, CONNECTIONS_AREA_KEY, ConnectionKey, TerminalStatus } from '@skysmack/packages-terminal-payments';
import { MenuItem, SubscriptionHandler } from '@skysmack/framework';
import { NgConnectionsFieldsConfig } from '../../ng-connections-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgConnectionsActions, NgConnectionsStore, NgConnectionsRequests } from '@skysmack/ng-terminal-payments';
import { LocalObject } from '@skysmack/framework';
import { take } from 'rxjs/operators';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { MatDialog } from '@angular/material/dialog';
import { TerminalsActionsComponent } from '../../../terminals';

@Component({
  selector: 'ss-connections-index',
  templateUrl: './connections-index.component.html'
})
export class ConnectionsIndexComponent extends RecordIndexComponent<ConnectionsAppState, Connection, ConnectionKey> implements OnInit {
  public static COMPONENT_KEY = 'connections-index';
  public componentKey = ConnectionsIndexComponent.COMPONENT_KEY;
  public areaKey: string = CONNECTIONS_AREA_KEY;
  public titleExtras = true;
  protected subscriptionHandler = new SubscriptionHandler();
  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction('Actions', this.terminalActions, 'settings', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => true),
    new MenuItem().asEventAction('Connect', this.connect, 'control_point', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => {
      if (entity.object.client && entity.object.client.object.online) {
        if (entity.object.status == TerminalStatus.Disconnected) {
          return true;
        }
      }
      return false;
    }),
    new MenuItem().asEventAction('Open', this.open, 'check', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => {
      if (entity.object.client && entity.object.client.object.online) {
        if (entity.object.status == TerminalStatus.Connected) {
          return true;
        }
      }
      return false;
    }),
    new MenuItem().asEventAction('Close', this.close, 'close', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => {
      if (entity.object.client && entity.object.client.object.online) {
        if (entity.object.status == TerminalStatus.Open) {
          return true;
        }
      }
      return false;
    }),
    new MenuItem().asEventAction('Abort', this.abort, 'report_problem', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => {
      if (entity.object.client && entity.object.client.object.online) {
        if (entity.object.status !== TerminalStatus.Disconnected) {
          return true;
        }
      }
      return false;
    }),
    new MenuItem().asEventAction('Disconnect', this.disconnect, 'cancel', this).setShowLogic((entity: LocalObject<Connection, ConnectionKey>) => {
      if (entity.object.client && entity.object.client.object.online) {
        if (entity.object.status == TerminalStatus.Open || entity.object.status == TerminalStatus.Connected) {
          return true;
        }
      }
      return false;
    }),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgConnectionsActions,
    public redux: NgSkysmackStore,
    public store: NgConnectionsStore,
    public fieldsConfig: NgConnectionsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders,
    public requests: NgConnectionsRequests,
    public dialog: MatDialog
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  protected terminalActions(_this: ConnectionsIndexComponent, value: LocalObject<Connection, ConnectionKey>) {
    _this.dialog.open(TerminalsActionsComponent, { data: value.object.id });
  }

  protected connect(_this: ConnectionsIndexComponent, value: LocalObject<Connection, ConnectionKey>) {
    this.subscriptionHandler.register(_this.requests.connect(_this.packagePath, value).pipe(take(1)).subscribe());
  }

  protected open(_this: ConnectionsIndexComponent, value: LocalObject<Connection, ConnectionKey>) {
    this.subscriptionHandler.register(_this.requests.open(_this.packagePath, value).pipe(take(1)).subscribe());
  }

  protected close(_this: ConnectionsIndexComponent, value: LocalObject<Connection, ConnectionKey>) {
    this.subscriptionHandler.register(_this.requests.close(_this.packagePath, value).pipe(take(1)).subscribe());
  }

  protected abort(_this: ConnectionsIndexComponent, value: LocalObject<Connection, ConnectionKey>) {
    this.subscriptionHandler.register(_this.requests.abort(_this.packagePath, value).pipe(take(1)).subscribe());
  }

  protected disconnect(_this: ConnectionsIndexComponent, value: LocalObject<Connection, ConnectionKey>) {
    this.subscriptionHandler.register(_this.requests.disconnect(_this.packagePath, value).pipe(take(1)).subscribe());
  }
}
