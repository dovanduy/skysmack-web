import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgLodgingReservationPriceChangesActions, NgLodgingReservationPriceChangesStore } from '@skysmack/ng-packages';
import { LodgingReservationPriceChangesAppState, LodgingReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { NgLodgingReservationPriceChangesFieldsConfig } from '../../ng-lodging-reservation-price-changes-fields-config';

@Component({
  selector: 'ss-lodging-reservation-price-changes-create',
  templateUrl: './lodging-reservation-price-changes-create.component.html'
})
export class LodgingReservationPriceChangesCreateComponent extends RecordFormComponent<LodgingReservationPriceChangesAppState, LodgingReservationPriceChange, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingReservationPriceChangesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingReservationPriceChangesFieldsConfig,
    public store: NgLodgingReservationPriceChangesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
