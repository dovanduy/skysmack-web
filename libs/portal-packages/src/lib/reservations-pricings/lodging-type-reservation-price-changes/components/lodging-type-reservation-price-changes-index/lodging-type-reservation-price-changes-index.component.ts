import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { LODGING_TYPE_RESERVATION_PRICE_CHANGES_AREA_KEY, LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { EntityAction } from '@skysmack/ng-ui';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgLodgingTypeReservationPriceChangesActions, NgLodgingTypeReservationPriceChangesStore } from '@skysmack/ng-packages';
import { NgLodgingTypeReservationPriceChangesMenu } from '../../ng-lodging-type-reservation-price-changes-menu';
import { NgLodgingTypeReservationPriceChangesFieldsConfig } from '../../ng-lodging-type-reservation-price-changes-fields-config';

@Component({
  selector: 'ss-lodging-type-reservation-price-changes-index',
  templateUrl: './lodging-type-reservation-price-changes-index.component.html'
})
export class LodgingTypeReservationPriceChangesIndexComponent extends RecordIndexComponent<LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChange, number> implements OnInit {

  public areaKey: string = LODGING_TYPE_RESERVATION_PRICE_CHANGES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingTypeReservationPriceChangesActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingTypeReservationPriceChangesStore,
    public sidebarMenu: NgLodgingTypeReservationPriceChangesMenu,
    public fieldsConfig: NgLodgingTypeReservationPriceChangesFieldsConfig,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
