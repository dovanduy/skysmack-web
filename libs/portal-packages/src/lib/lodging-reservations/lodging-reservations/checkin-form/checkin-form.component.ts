import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LodgingReservationsAppState, CheckIn, LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { FormBaseComponent } from '@skysmack/portal-fields';
import { NgLodgingReservationsActions } from '@skysmack/ng-lodging-reservations';
import { NgCheckinFieldsConfig } from '../../checkin-fields-config';
import { switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalObject, toLocalObject } from '@skysmack/framework';

@Component({
  selector: 'ss-checkin-form',
  templateUrl: './checkin-form.component.html'
})
export class CheckinFormComponent extends FormBaseComponent<LodgingReservationsAppState, CheckIn, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public skysmackStore: NgSkysmackStore,
    public actions: NgLodgingReservationsActions,
    public fieldsConfig: NgCheckinFieldsConfig,
    @Inject(MAT_DIALOG_DATA) private data: { packagePath: string, reservation: LocalObject<LodgingReservation, number> }) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  protected setCreateFields() {
      this.fields$ = this.loadedPackage$.pipe(switchMap(_package => this.fieldsConfig.getFields(_package, toLocalObject(new CheckIn({ reservationId: this.data.reservation.object.id, lodgingId: this.data.reservation.object.lodgingId, reservation: this.data.reservation.object })))));
  }
}
