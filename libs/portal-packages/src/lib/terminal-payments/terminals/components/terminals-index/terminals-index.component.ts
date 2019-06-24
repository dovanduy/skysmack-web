import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgTerminalsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgTerminalsStore } from '@skysmack/ng-packages';
import { Terminal, TerminalsAppState, TERMINALS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { NgTerminalsMenu } from '../../ng-terminals-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgTerminalsFieldsConfig } from '../../ng-terminals-fields-config';
import { NgSignalR } from '@skysmack/ng-framework';

@Component({
  selector: 'ss-terminals-index',
  templateUrl: './terminals-index.component.html'
})
export class TerminalsIndexComponent extends RecordIndexComponent<TerminalsAppState, Terminal, number> implements OnInit {

  public areaKey: string = TERMINALS_AREA_KEY;
  public titleExtras = true;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgTerminalsActions,
    public redux: NgSkysmackStore,
    public store: NgTerminalsStore,
    public sidebarMenu: NgTerminalsMenu,
    public fieldsConfig: NgTerminalsFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders,
    public signalR: NgSignalR
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
    this.signalR.instance.join(this.packagePath);
  }
}
