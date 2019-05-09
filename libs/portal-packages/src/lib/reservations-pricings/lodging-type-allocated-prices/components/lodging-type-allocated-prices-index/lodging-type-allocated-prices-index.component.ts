import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { LODGING_TYPE_ALLOCATED_PRICES_AREA_KEY, LodgingTypeAllocatedPricesAppState, LodgingTypeAllocatedPrice } from '@skysmack/packages-reservations-pricings';
import { EntityAction } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgLodgingTypeAllocatedPricesActions, NgLodgingTypeAllocatedPricesStore } from '@skysmack/ng-packages';
import { NgLodgingTypeAllocatedPricesMenu } from '../../ng-lodging-type-allocated-prices-menu';
import { NgLodgingTypeAllocatedPricesFieldsConfig } from '../../ng-lodging-type-allocated-prices-fields-config';

@Component({
  selector: 'ss-lodging-type-allocated-prices-index',
  templateUrl: './lodging-type-allocated-prices-index.component.html'
})
export class LodgingTypeAllocatedPricesIndexComponent extends RecordIndexComponent<LodgingTypeAllocatedPricesAppState, LodgingTypeAllocatedPrice, number> implements OnInit {

  public areaKey: string = LODGING_TYPE_ALLOCATED_PRICES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingTypeAllocatedPricesActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingTypeAllocatedPricesStore,
    public sidebarMenu: NgLodgingTypeAllocatedPricesMenu,
    public fieldsConfig: NgLodgingTypeAllocatedPricesFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
