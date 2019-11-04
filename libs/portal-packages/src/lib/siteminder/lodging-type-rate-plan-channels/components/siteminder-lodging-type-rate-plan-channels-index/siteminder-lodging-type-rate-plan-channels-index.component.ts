import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderLodgingTypeRatePlanChannelsStore, NgSiteMinderLodgingTypeRatePlanChannelsActions } from '@skysmack/ng-siteminder';
import { LodgingTypeRatePlanChannel, SiteMinderLodgingTypeRatePlanChannelsAppState, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_AREA_KEY, LodgingTypeRatePlanChannelKey } from '@skysmack/packages-siteminder';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgSiteMinderLodgingTypeRatePlanChannelsFieldsConfig } from '../../ng-siteminder-lodging-type-rate-plan-channels-fields-config';

@Component({
  selector: 'ss-siteminder-lodging-type-rate-plan-channels-index',
  templateUrl: './siteminder-lodging-type-rate-plan-channels-index.component.html'
})
export class SiteMinderLodgingTypeRatePlanChannelsIndexComponent extends RecordIndexComponent<SiteMinderLodgingTypeRatePlanChannelsAppState, LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey> implements OnInit {
  public static COMPONENT_KEY = 'siteminder-lodging-type-rate-plan-channels-index';
  public componentKey = SiteMinderLodgingTypeRatePlanChannelsIndexComponent.COMPONENT_KEY;

  public areaKey: string = SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_AREA_KEY;
  public titleExtras = true;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgSiteMinderLodgingTypeRatePlanChannelsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgSiteMinderLodgingTypeRatePlanChannelsStore,
    public fieldsConfig: NgSiteMinderLodgingTypeRatePlanChannelsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
