import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LodgingReservationsAppState, Move, LodgingReservation, CheckIn } from '@skysmack/packages-lodging-reservations';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { FormBaseComponent } from '@skysmack/portal-fields';
import { NgLodgingReservationsActions } from '@skysmack/ng-lodging-reservations';
import { switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LocalObject, toLocalObject } from '@skysmack/framework';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { NgConfirmReservationFieldsConfig } from '../../confirm-reservation-fields-config';

@Component({
  selector: 'ss-confirm-reservation-dialog',
  templateUrl: './confirm-reservation-dialog.component.html'
})
export class ConfirmReservationDialogComponent extends FormBaseComponent<LodgingReservationsAppState, any, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public skysmackStore: NgSkysmackStore,
    public actions: NgLodgingReservationsActions,
    public fieldsConfig: NgConfirmReservationFieldsConfig,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: { packagePath: string, reservation: LocalObject<LodgingReservation, number> }) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  protected setCreateFields() {
    this.fields$ = this.loadedPackage$.pipe(
      switchMap(_package => this.fieldsConfig.getFields(_package, toLocalObject(new Move({
        reservationId: this.data.reservation.object.id,
        lodgingId: this.data.reservation.object.lodgingId,
        reservation: this.data.reservation.object
      }))))
    );
  }

  protected onSubmit(fh: FormHelper): void {
    const value = this.extractFormValues(fh);
    if (value.object.overbook) {
      // What happens here?
    } else {
      const { packagePath, reservation } = this.data;

      this.actions.confirm(packagePath, reservation, [new CheckIn({
        reservation: reservation.object,
        lodgingId: reservation.object.lodgingId,
        reservationId: reservation.object.id
      })]);
    }

    this.dialog.closeAll();
  }
}
