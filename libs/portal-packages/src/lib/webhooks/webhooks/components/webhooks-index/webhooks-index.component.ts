import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgWebhooksActions, NgWebhooksStore } from '@skysmack/ng-webhooks';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Webhook, WebhooksAppState, WEBHOOKS_AREA_KEY } from '@skysmack/packages-webhooks';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgWebhooksFieldsConfig } from '../../ng-webhooks-fields-config';

@Component({
  selector: 'ss-webhooks-index',
  templateUrl: './webhooks-index.component.html'
})
export class WebhooksIndexComponent extends RecordIndexComponent<WebhooksAppState, Webhook, number> implements OnInit {
  public static COMPONENT_KEY = 'webhooks-index';
  public componentKey = WebhooksIndexComponent.COMPONENT_KEY;

  public areaKey: string = WEBHOOKS_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgWebhooksActions,
    public redux: NgSkysmackStore,
    public store: NgWebhooksStore,
    public fieldsConfig: NgWebhooksFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
