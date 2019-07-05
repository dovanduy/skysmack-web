import { Component, OnInit } from '@angular/core';
import { NgLodgingReservationPriceChangesActions, NgLodgingReservationPriceChangesStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { LodgingReservationPriceChangesAppState, LodgingReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { NgLodgingReservationPriceChangesFieldsConfig } from '../../ng-lodging-reservation-price-changes-fields-config';

@Component({
  selector: 'ss-lodging-reservation-price-changes-edit',
  templateUrl: './lodging-reservation-price-changes-edit.component.html'
})
export class LodgingReservationPriceChangesEditComponent extends RecordFormComponent<LodgingReservationPriceChangesAppState, LodgingReservationPriceChange, number> implements OnInit {
  protected productTypes$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingReservationPriceChangesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingReservationPriceChangesFieldsConfig,
    public store: NgLodgingReservationPriceChangesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
