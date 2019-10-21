import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTION_DETAILS, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderChannelsStore, NgSiteMinderChannelsActions } from '@skysmack/ng-siteminder';
import { Channel, SiteMinderChannelsAppState, SITE_MINDER_CHANNELS_AREA_KEY, SiteMinderPermissions } from '@skysmack/packages-siteminder';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgSiteMinderChannelsFieldsConfig } from '../../ng-siteminder-channels-fields-config';

@Component({
  selector: 'ss-siteminder-channels-index',
  templateUrl: './siteminder-channels-index.component.html'
})
export class SiteMinderChannelsIndexComponent extends RecordIndexComponent<SiteMinderChannelsAppState, Channel, number> implements OnInit {
  public static COMPONENT_KEY = 'siteminder-channels-index';
  public componentKey = SiteMinderChannelsIndexComponent.COMPONENT_KEY;

  public areaKey: string = SITE_MINDER_CHANNELS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('details', MENU_ITEM_ACTION_DETAILS, 'list'),
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit').setPermissions([
      SiteMinderPermissions.updateChannels,
    ]),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this).setPermissions([
      SiteMinderPermissions.removeChannels,
    ])
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgSiteMinderChannelsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgSiteMinderChannelsStore,
    public fieldsConfig: NgSiteMinderChannelsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
