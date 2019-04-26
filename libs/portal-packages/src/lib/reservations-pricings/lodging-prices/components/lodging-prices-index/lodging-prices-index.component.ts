import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { LODGING_PRICES_AREA_KEY, LodgingPricesAppState, LodgingPrice } from '@skysmack/packages-reservations-pricings';
import { EntityAction } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgLodgingPricesActions, NgLodgingPricesStore } from '@skysmack/ng-packages';
import { NgLodgingPricesMenu } from '../../ng-lodging-prices-menu';
import { NgLodgingPricesFieldsConfig } from '../../ng-lodging-prices-fields-config';

@Component({
  selector: 'ss-lodging-prices-index',
  templateUrl: './lodging-prices-index.component.html'
})
export class LodgingPricesIndexComponent extends RecordIndexComponent<LodgingPricesAppState, LodgingPrice, number> implements OnInit {

  public area: string = LODGING_PRICES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingPricesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgLodgingPricesStore,
    public sidebarMenu: NgLodgingPricesMenu,
    public fieldsConfig: NgLodgingPricesFieldsConfig,
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
