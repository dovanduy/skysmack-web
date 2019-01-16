import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import { LodgingsReservationsIndexComponent } from '../lodgings-reservations-index/lodgings-reservations-index.component';

@Component({
  selector: 'ss-lodgings-arrivals',
  templateUrl: './lodgings-arrivals.component.html',
  styleUrls: ['./lodgings-arrivals.component.scss']
})
export class LodgingsArrivalsComponent extends LodgingsReservationsIndexComponent implements OnInit {
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
    this.filter();
    this.sort();
    this.pageTitle.setTitle('Arrivals');
    super.ngOnInit();
  }

  private filter() {
    this.filterBuilder = new RSQLFilterBuilder();
    this.filterBuilder.column('status').like(ReservationViewModel.StatusEnum.Reserved).and().column('checkIn').lessThanOrEqualTo(moment().toDate());
  }

  private sort() {
    this.sortBuilder = new SortBuilder();
    this.sortBuilder.add('checkIn', false);
  }
}
