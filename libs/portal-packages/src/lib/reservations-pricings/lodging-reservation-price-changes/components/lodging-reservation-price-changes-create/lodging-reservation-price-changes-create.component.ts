import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgLodgingReservationPriceChangesActions, NgLodgingReservationPriceChangesStore } from '@skysmack/ng-reservations-pricings';
import { LodgingReservationPriceChangesAppState, LodgingReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { NgLodgingReservationPriceChangesFieldsConfig } from '../../ng-lodging-reservation-price-changes-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

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
