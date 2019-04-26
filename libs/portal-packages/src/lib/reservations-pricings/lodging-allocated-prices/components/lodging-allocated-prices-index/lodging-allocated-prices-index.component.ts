import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { LODGING_ALLOCATED_PRICES_AREA_KEY, LodgingAllocatedPricesAppState, LodgingAllocatedPrice } from '@skysmack/packages-reservations-pricings';
import { EntityAction } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgLodgingAllocatedPricesActions, NgLodgingAllocatedPricesStore } from '@skysmack/ng-packages';
import { NgLodgingAllocatedPricesMenu } from '../../ng-lodging-allocated-prices-menu';
import { NgLodgingAllocatedPricesFieldsConfig } from '../../ng-lodging-allocated-prices-fields-config';

@Component({
  selector: 'ss-lodging-allocated-prices-index',
  templateUrl: './lodging-allocated-prices-index.component.html'
})
export class LodgingAllocatedPricesIndexComponent extends RecordIndexComponent<LodgingAllocatedPricesAppState, LodgingAllocatedPrice, number> implements OnInit {

  public area: string = LODGING_ALLOCATED_PRICES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingAllocatedPricesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgLodgingAllocatedPricesStore,
    public sidebarMenu: NgLodgingAllocatedPricesMenu,
    public fieldsConfig: NgLodgingAllocatedPricesFieldsConfig,
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
