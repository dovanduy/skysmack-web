import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgLodgingReservationsStore, NgLodgingsStore, NgLodgingTypesStore, NgLodgingsActions, NgLodgingTypesActions, NgLodgingReservationsActions } from '@skysmack/ng-packages';
import { EntityComponentPageTitle, MenuItemActionProviders } from '@skysmack/portal-ui';
import { LodgingsReservationsIndexComponent } from '../../lodging-reservations/lodgings-reservations-index/lodgings-reservations-index.component';
import { RSQLFilterBuilder, SortBuilder } from '@skysmack/framework';
import * as _moment from 'moment';
const moment = _moment;

import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { NgLodgingsReservationsMenu } from '../../ng-lodgings-reservations-menu';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-lodgings-departures',
  templateUrl: './lodgings-departures.component.html'
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
    public sidebarMenu: NgLodgingsReservationsMenu,
    public pageTitle: EntityComponentPageTitle,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, skysmackStore, store, lodgingsStore, lodgingTypesStore, actions, lodgingsActions, lodgingTypesActions, fieldsConfig, sidebarMenu, pageTitle, title, menuItemActionProviders);
  }

  ngOnInit() {
    this.filter();
    this.sort();
    this.pageTitle.setTitle('LODGING_RESERVATIONS.DEPARTURES');
    super.ngOnInit();
  }

  private filter() {
    this.pagedQuery.rsqlFilter = new RSQLFilterBuilder();
    this.pagedQuery.rsqlFilter
      .column('status').like(LodgingReservation.statusEnum.InStay).and()
      .column('checkOut').lessThanOrEqualTo(moment().toDate());
  }

  private sort() {
    this.pagedQuery.sort = new SortBuilder();
    this.pagedQuery.sort.add('checkOut', false);
  }

}
