import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgTemplatesActions, NgTemplatesStore } from '@skysmack/ng-templates';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Template, TemplatesAppState, TEMPLATES_AREA_KEY } from '@skysmack/packages-templates';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgTemplatesFieldsConfig } from '../../ng-templates-fields-config';

@Component({
  selector: 'ss-templates-index',
  templateUrl: './templates-index.component.html'
})
export class TemplatesIndexComponent extends RecordIndexComponent<TemplatesAppState, Template, number> implements OnInit {
  public static COMPONENT_KEY = 'templates-index';
  public componentKey = TemplatesIndexComponent.COMPONENT_KEY;

  public areaKey: string = TEMPLATES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgTemplatesActions,
    public redux: NgSkysmackStore,
    public store: NgTemplatesStore,
    public fieldsConfig: NgTemplatesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
