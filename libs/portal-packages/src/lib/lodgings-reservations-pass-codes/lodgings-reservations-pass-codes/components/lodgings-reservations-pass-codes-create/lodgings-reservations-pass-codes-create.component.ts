import { Component, OnInit } from '@angular/core';
import { LodgingReservationPassCode, LodgingsReservationsPassCodesAppState, LodgingReservationPassCodeKey } from '@skysmack/ng-lodgings-reservations-pass-codes';
import { NgLodgingsReservationsPassCodesActions, NgLodgingsReservationsPassCodesStore } from '@skysmack/ng-lodgings-reservations-pass-codes';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgLodgingsReservationsPassCodesFieldsConfig } from '../../ng-lodgings-reservations-pass-codes-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-lodgings-reservations-pass-codes-create',
  templateUrl: './lodgings-reservations-pass-codes-create.component.html'
})
export class LodgingsReservationsPassCodesCreateComponent extends RecordFormComponent<LodgingsReservationsPassCodesAppState, LodgingReservationPassCode, LodgingReservationPassCodeKey> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingsReservationsPassCodesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingsReservationsPassCodesFieldsConfig,
    public store: NgLodgingsReservationsPassCodesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
