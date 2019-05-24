import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgTerminalsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgTerminalsStore } from '@skysmack/ng-packages';
import { Terminal, TerminalsAppState, TERMINALS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { NgTerminalsMenu } from '../../ng-terminals-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgTerminalsFieldsConfig } from '../../ng-terminals-fields-config';

@Component({
  selector: 'ss-terminals-index',
  templateUrl: './terminals-index.component.html'
})
export class TerminalsIndexComponent extends DocumentRecordIndexComponent<TerminalsAppState, Terminal, number> implements OnInit {

  public areaKey: string = TERMINALS_AREA_KEY;
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
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
