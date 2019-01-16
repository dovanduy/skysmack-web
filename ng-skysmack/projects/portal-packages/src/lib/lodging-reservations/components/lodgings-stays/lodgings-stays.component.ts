import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LodgingsReservationsFeatureRedux } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-redux/lodgings-reservations-feature-redux';
import { LodgingsReservationsFeatureFieldsConfig } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-fields-config';
import { EntityComponentPageTitle, RSQLFilterBuilder, SortBuilder } from 'framework';
import { LodgingTypesRedux, LodgingsRedux } from 'packages';
import { ReservationsMenu } from 'features/lodgings-reservations-feature/reservations-menu';
import { LodgingsReservationsIndexComponent } from '../lodgings-reservations-index/lodgings-reservations-index.component';
import { LodgingsReservationsFeatureMenu } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-menu';
import { ReservationViewModel } from 'skysmack-api';

@Component({
  selector: 'ss-lodgings-stays',
  templateUrl: './lodgings-stays.component.html',
  styleUrls: ['./lodgings-stays.component.scss']
})
export class LodgingsStaysComponent extends LodgingsReservationsIndexComponent implements OnInit {
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
    this.pageTitle.setTitle('Stays');
    super.ngOnInit();
  }

  private filter() {
    this.filterBuilder = new RSQLFilterBuilder();
    this.filterBuilder.column('status').like(ReservationViewModel.StatusEnum.InStay);
  }

  private sort() {
    this.sortBuilder = new SortBuilder();
    this.sortBuilder.add('checkIn', false);
  }
}
