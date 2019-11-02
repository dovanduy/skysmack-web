import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderLodgingTypeRatePlansStore, NgSiteMinderLodgingTypeRatePlansActions } from '@skysmack/ng-siteminder';
import { LodgingTypeRatePlan, SiteMinderLodgingTypeRatePlansAppState, SITE_MINDER_LODGING_TYPE_RATE_PLANS_AREA_KEY, LodgingTypeRatePlanKey } from '@skysmack/packages-siteminder';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgSiteMinderLodgingTypeRatePlansFieldsConfig } from '../../ng-siteminder-lodging-type-rate-plans-fields-config';

@Component({
  selector: 'ss-siteminder-lodging-type-rate-plans-index',
  templateUrl: './siteminder-lodging-type-rate-plans-index.component.html'
})
export class SiteMinderLodgingTypeRatePlansIndexComponent extends RecordIndexComponent<SiteMinderLodgingTypeRatePlansAppState, LodgingTypeRatePlan, LodgingTypeRatePlanKey> implements OnInit {
  public static COMPONENT_KEY = 'siteminder-lodging-type-rate-plans-index';
  public componentKey = SiteMinderLodgingTypeRatePlansIndexComponent.COMPONENT_KEY;

  public areaKey: string = SITE_MINDER_LODGING_TYPE_RATE_PLANS_AREA_KEY;
  public titleExtras = true;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgSiteMinderLodgingTypeRatePlansActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgSiteMinderLodgingTypeRatePlansStore,
    public fieldsConfig: NgSiteMinderLodgingTypeRatePlansFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
