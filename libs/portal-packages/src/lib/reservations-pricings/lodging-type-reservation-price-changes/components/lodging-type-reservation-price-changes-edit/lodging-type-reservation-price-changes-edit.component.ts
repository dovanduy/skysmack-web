import { Component, OnInit } from '@angular/core';
import { NgLodgingTypeReservationPriceChangesActions, NgLodgingTypeReservationPriceChangesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { NgLodgingTypeReservationPriceChangesFieldsConfig } from '../../ng-lodging-type-reservation-price-changes-fields-config';

@Component({
  selector: 'ss-lodging-type-reservation-price-changes-edit',
  templateUrl: './lodging-type-reservation-price-changes-edit.component.html'
})
export class LodgingTypeReservationPriceChangesEditComponent extends RecordFormComponent<LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChange, number> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingTypeReservationPriceChangesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingTypeReservationPriceChangesFieldsConfig,
    public store: NgLodgingTypeReservationPriceChangesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
