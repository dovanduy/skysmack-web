import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { LODGING_TYPE_PRICES_AREA_KEY, LodgingTypePricesAppState, LodgingTypePrice } from '@skysmack/packages-reservations-pricings';
import { EntityAction } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgLodgingTypePricesActions, NgLodgingTypePricesStore } from '@skysmack/ng-packages';
import { NgLodgingTypePricesMenu } from '../../ng-lodging-type-prices-menu';
import { NgLodgingTypePricesFieldsConfig } from '../../ng-lodging-type-prices-fields-config';

@Component({
  selector: 'ss-lodging-type-prices-index',
  templateUrl: './lodging-type-prices-index.component.html'
})
export class LodgingTypePricesIndexComponent extends RecordIndexComponent<LodgingTypePricesAppState, LodgingTypePrice, number> implements OnInit {

  public areaKey: string = LODGING_TYPE_PRICES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingTypePricesActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingTypePricesStore,
    public sidebarMenu: NgLodgingTypePricesMenu,
    public fieldsConfig: NgLodgingTypePricesFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
