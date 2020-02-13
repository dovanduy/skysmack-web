import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgDefinitionsActions, NgDefinitionsStore } from '@skysmack/ng-workflows';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Definition, DefinitionsAppState, DEFINITIONS_AREA_KEY } from '@skysmack/packages-workflows';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgDefinitionsFieldsConfig } from '../../ng-definitions-fields-config';

@Component({
  selector: 'ss-definitions-index',
  templateUrl: './definitions-index.component.html'
})
export class DefinitionsIndexComponent extends RecordIndexComponent<DefinitionsAppState, Definition, number> implements OnInit {
  public static COMPONENT_KEY = 'definitions-index';
  public componentKey = DefinitionsIndexComponent.COMPONENT_KEY;

  public areaKey: string = DEFINITIONS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgDefinitionsActions,
    public redux: NgSkysmackStore,
    public store: NgDefinitionsStore,
    public fieldsConfig: NgDefinitionsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
