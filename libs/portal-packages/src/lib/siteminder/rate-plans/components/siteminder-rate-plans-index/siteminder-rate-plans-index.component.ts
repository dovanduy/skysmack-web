import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTION_DETAILS, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgSiteMinderRatePlansStore, NgSiteMinderRatePlansActions } from '@skysmack/ng-siteminder';
import { RatePlan, SiteMinderRatePlansAppState, SITE_MINDER_RATE_PLANS_AREA_KEY, SiteMinderPermissions } from '@skysmack/packages-siteminder';
import { MenuItem, LocalObject } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgSiteMinderRatePlansFieldsConfig } from '../../ng-siteminder-rate-plans-fields-config';
import { SiteMinderRatePlansDetailsComponent } from '../siteminder-rate-plans-details/siteminder-rate-plans-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ss-siteminder-rate-plans-index',
  templateUrl: './siteminder-rate-plans-index.component.html'
})
export class SiteMinderRatePlansIndexComponent extends RecordIndexComponent<SiteMinderRatePlansAppState, RatePlan, number> implements OnInit {
  public static COMPONENT_KEY = 'siteminder-rate-plans-index';
  public componentKey = SiteMinderRatePlansIndexComponent.COMPONENT_KEY;

  public areaKey: string = SITE_MINDER_RATE_PLANS_AREA_KEY;
  public titleExtras = true;

  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTION_DETAILS, (_this: SiteMinderRatePlansIndexComponent, value: LocalObject<RatePlan, number>) => {
      _this.dialog.open(SiteMinderRatePlansDetailsComponent, {
        width: '500px',
        data: { entityId: value.object.id }
      });
    }, 'list', this),
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit').setPermissions([
      SiteMinderPermissions.updateRatePlans,
    ]),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this).setPermissions([
      SiteMinderPermissions.removeRatePlans,
    ])
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgSiteMinderRatePlansActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgSiteMinderRatePlansStore,
    public fieldsConfig: NgSiteMinderRatePlansFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders,
    private dialog: MatDialog
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
