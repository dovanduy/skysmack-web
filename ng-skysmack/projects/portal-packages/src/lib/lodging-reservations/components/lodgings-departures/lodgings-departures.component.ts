import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgLodgingReservationsStore, NgLodgingsStore, NgLodgingTypesStore, NgLodgingReservationsFieldsConfig, NgLodgingsActions, NgLodgingTypesActions, NgLodgingReservationsActions, NgSkysmackStore } from '@skysmack/ng-packages';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { LodgingsReservationsIndexComponent } from '../lodgings-reservations-index/lodgings-reservations-index.component';
import { RSQLFilterBuilder, SortBuilder } from '@skysmack/framework';
import { NgReservationsMenu } from '../../ng-reservations-menu';
import * as _moment from 'moment';
const moment = _moment;

import { LodgingReservation } from '@skysmack/packages-lodging-reservations';

@Component({
  selector: 'ss-lodgings-departures',
  templateUrl: './lodgings-departures.component.html',
  styleUrls: ['./lodgings-departures.component.scss']
})
export class LodgingsDeparturesComponent extends LodgingsReservationsIndexComponent implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingReservationsStore,
    public lodgingsStore: NgLodgingsStore,
    public lodgingTypesStore: NgLodgingTypesStore,
    public actions: NgLodgingReservationsActions,
    public lodgingsActions: NgLodgingsActions,
    public lodgingTypesActions: NgLodgingTypesActions,
    public fieldsConfig: NgLodgingReservationsFieldsConfig,
    public sidebarMenu: NgReservationsMenu,
    public pageTitle: EntityComponentPageTitle
  ) {
    super(router, activatedRoute, skysmackStore, store, lodgingsStore, lodgingTypesStore, actions, lodgingsActions, lodgingTypesActions, fieldsConfig, sidebarMenu, pageTitle);
  }

  ngOnInit() {
    // this.filter();
    // this.sort();
    this.pageTitle.setTitle('Departures');
    super.ngOnInit();
  }

  private filter() {
    this.filterBuilder = new RSQLFilterBuilder();
    this.filterBuilder
      .column('status').like(LodgingReservation.ReservationStatusEnum.InStay).and()
      .column('checkOut').lessThanOrEqualTo(moment().toDate());
  }

  private sort() {
    this.sortBuilder = new SortBuilder();
    this.sortBuilder.add('checkOut', false);
  }

}
