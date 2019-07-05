import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgTerminalsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgTerminalsStore } from '@skysmack/ng-packages';
import { Terminal, TerminalsAppState, TERMINALS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { NgTerminalsMenu } from '../../ng-terminals-menu';
import { MenuItem } from '@skysmack/framework';
import { NgTerminalsFieldsConfig } from '../../ng-terminals-fields-config';

@Component({
  selector: 'ss-terminals-index',
  templateUrl: './terminals-index.component.html'
})
export class TerminalsIndexComponent extends RecordIndexComponent<TerminalsAppState, Terminal, number> implements OnInit {

  public areaKey: string = TERMINALS_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
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
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
