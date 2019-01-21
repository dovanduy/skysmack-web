import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgLodgingReservationsStore, NgLodgingsStore, NgLodgingTypesStore, NgLodgingReservationsFieldsConfig, NgLodgingsActions, NgLodgingTypesActions, NgLodgingReservationsActions, NgSkysmackStore } from '@skysmack/ng-packages';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { LodgingsReservationsIndexComponent } from '../lodgings-reservations-index/lodgings-reservations-index.component';
import { RSQLFilterBuilder, SortBuilder } from '@skysmack/framework';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { NgReservationsMenu } from '../../ng-reservations-menu';


@Component({
  selector: 'ss-lodgings-stays',
  templateUrl: './lodgings-stays.component.html',
  styleUrls: ['./lodgings-stays.component.scss']
})
export class LodgingsStaysComponent extends LodgingsReservationsIndexComponent implements OnInit {
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
    this.filter();
    this.sort();
    this.pageTitle.setTitle('Stays');
    super.ngOnInit();
  }

  private filter() {
    this.filterBuilder = new RSQLFilterBuilder();
    this.filterBuilder.column('status').like(LodgingReservation.statusEnum.InStay);
  }

  private sort() {
    this.sortBuilder = new SortBuilder();
    this.sortBuilder.add('checkIn', false);
  }
}
