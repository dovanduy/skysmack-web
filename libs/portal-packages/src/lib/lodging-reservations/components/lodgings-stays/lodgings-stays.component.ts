import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgLodgingsStore, NgLodgingTypesStore, NgLodgingsActions, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { EntityComponentPageTitle, MenuItemActionProviders } from '@skysmack/portal-ui';
import { LodgingsReservationsIndexComponent } from '../../lodging-reservations/lodgings-reservations-index/lodgings-reservations-index.component';
import { RSQLFilterBuilder, SortBuilder } from '@skysmack/framework';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgLodgingReservationsStore, NgLodgingReservationsActions } from '@skysmack/ng-lodging-reservations';
import { NgFieldActions } from '@skysmack/ng-framework';

@Component({
  selector: 'ss-lodgings-stays',
  templateUrl: './lodgings-stays.component.html'
})
export class LodgingsStaysComponent extends LodgingsReservationsIndexComponent implements OnInit {
  public titleExtras = true;
  public titleExtrasTranslationPostFix = '.STAYS.TITLE_EXTRAS';
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
    public fieldActions: NgFieldActions,
    public pageTitle: EntityComponentPageTitle,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(
      router,
      activatedRoute,
      skysmackStore,
      store,
      lodgingsStore,
      lodgingTypesStore,
      actions,
      lodgingsActions,
      lodgingTypesActions,
      fieldsConfig,
      fieldActions,
      pageTitle,
      title,
      menuItemActionProviders
    );
    pageTitle.setTitle('LODGING_RESERVATIONS.STAYS.TITLE');
  }

  ngOnInit() {
    this.refresh();
    this.filter();
    this.sort();
    this.pageTitle.setTitle('LODGING_RESERVATIONS.STAYS.TITLE');
    super.ngOnInit();
  }

  private filter() {
    this.pagedQuery.rsqlFilter = new RSQLFilterBuilder();
    this.pagedQuery.rsqlFilter.column('status').like(LodgingReservation.statusEnum.InStay);
  }

  private sort() {
    this.pagedQuery.sort = new SortBuilder();
    this.pagedQuery.sort.add('checkIn', false);
  }
}
