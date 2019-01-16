import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LodgingsReservationsFeatureRedux } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-redux/lodgings-reservations-feature-redux';
import { LodgingTypesRedux, LodgingsRedux } from 'packages';
import { LodgingsReservationsFeatureFieldsConfig } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-fields-config';
import { ReservationsMenu } from 'features/lodgings-reservations-feature/reservations-menu';
import { EntityComponentPageTitle, RSQLFilterBuilder, SortBuilder } from 'framework';
import { LodgingsReservationsIndexComponent } from '../lodgings-reservations-index/lodgings-reservations-index.component';
import { LodgingsReservationsFeatureMenu } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-menu';
import { ReservationViewModel } from 'skysmack-api';
import * as moment from 'moment';

@Component({
  selector: 'ss-lodgings-departures',
  templateUrl: './lodgings-departures.component.html',
  styleUrls: ['./lodgings-departures.component.scss']
})
export class LodgingsDeparturesComponent extends LodgingsReservationsIndexComponent implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public redux: LodgingsReservationsFeatureRedux,
    public lodgingsRedux: LodgingsRedux,
    public lodgingsTypeRedux: LodgingTypesRedux,
    public fieldsConfig: LodgingsReservationsFeatureFieldsConfig,
    public menuSidebar: LodgingsReservationsFeatureMenu,
    public reservationSidebar: ReservationsMenu,
    public pageTitle: EntityComponentPageTitle
  ) {
    super(router, activatedRoute, redux, lodgingsRedux, lodgingsTypeRedux, fieldsConfig, menuSidebar, pageTitle);
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
      .column('status').like(ReservationViewModel.StatusEnum.InStay).and()
      .column('checkOut').lessThanOrEqualTo(moment().toDate());
  }

  private sort() {
    this.sortBuilder = new SortBuilder();
    this.sortBuilder.add('checkOut', false);
  }

}
