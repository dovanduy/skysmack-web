import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgLodgingTypeReservationPriceChangesActions, NgLodgingTypeReservationPriceChangesStore } from '@skysmack/ng-packages';
import { LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { NgLodgingTypeReservationPriceChangesFieldsConfig } from '../../ng-lodging-type-reservation-price-changes-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-lodging-type-reservation-price-changes-create',
  templateUrl: './lodging-type-reservation-price-changes-create.component.html'
})
export class LodgingTypeReservationPriceChangesCreateComponent extends RecordFormComponent<LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChange, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingTypeReservationPriceChangesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingTypeReservationPriceChangesFieldsConfig,
    public store: NgLodgingTypeReservationPriceChangesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
