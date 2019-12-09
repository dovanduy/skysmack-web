import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgLodgingsReservationsPassCodesActions, NgLodgingsReservationsPassCodesStore, LodgingReservationPassCodeKey } from '@skysmack/ng-lodgings-reservations-pass-codes';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { LodgingReservationPassCode, LodgingsReservationsPassCodesAppState, LODGINGS_RESERVATIONS_PASS_CODES_AREA_KEY } from '@skysmack/ng-lodgings-reservations-pass-codes';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgLodgingsReservationsPassCodesFieldsConfig } from '../../ng-lodgings-reservations-pass-codes-fields-config';

@Component({
  selector: 'ss-lodgings-reservations-pass-codes-index',
  templateUrl: './lodgings-reservations-pass-codes-index.component.html'
})
export class LodgingsReservationsPassCodesIndexComponent extends RecordIndexComponent<LodgingsReservationsPassCodesAppState, LodgingReservationPassCode, LodgingReservationPassCodeKey> implements OnInit {
  public static COMPONENT_KEY = 'lodgings-reservations-pass-codes-index';
  public componentKey = LodgingsReservationsPassCodesIndexComponent.COMPONENT_KEY;

  public areaKey: string = LODGINGS_RESERVATIONS_PASS_CODES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingsReservationsPassCodesActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingsReservationsPassCodesStore,
    public fieldsConfig: NgLodgingsReservationsPassCodesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
