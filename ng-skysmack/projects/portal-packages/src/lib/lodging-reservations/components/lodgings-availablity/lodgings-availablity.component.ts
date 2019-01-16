import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, EntityCrudIndexTimePaged } from 'framework';
import { Router, ActivatedRoute } from '@angular/router';
import { LodgingsReservationsFeatureRedux } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-redux';
import { LodgingsReservationsFeatureFieldsConfig } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-fields-config';
import { ReservationsMenu } from 'features/lodgings-reservations-feature/reservations-menu';

@Component({
  selector: 'ss-lodgings-availablity',
  templateUrl: './lodgings-availablity.component.html',
  styleUrls: ['./lodgings-availablity.component.scss'],

})
export class LodgingsAvailablityComponent extends EntityCrudIndexTimePaged implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public redux: LodgingsReservationsFeatureRedux,
    public fieldsConfig: LodgingsReservationsFeatureFieldsConfig,
    public menuSidebar: ReservationsMenu,
    public pageTitle: EntityComponentPageTitle
  ) {
    super(router, activatedRoute, redux, fieldsConfig);
    pageTitle.setTitle('Availability');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
