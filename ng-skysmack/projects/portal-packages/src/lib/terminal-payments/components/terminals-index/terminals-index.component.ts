import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgTerminalsActions, NgTerminalsFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgTerminalsStore } from '@skysmack/ng-packages';
import { Terminal, TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { NgTerminalsMenu } from './../../ng-terminals-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';


@Component({
  selector: 'ss-terminals-index',
  templateUrl: './terminals-index.component.html',
  styleUrls: ['./terminals-index.component.scss']
})
export class TerminalsIndexComponent extends DocumentRecordIndexComponent<TerminalsAppState, Terminal, number> implements OnInit {

  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgTerminalsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgTerminalsStore,
    public sidebarMenu: NgTerminalsMenu,
    public fieldsConfig: NgTerminalsFieldsConfig,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldStore
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
