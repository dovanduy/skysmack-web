import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LodgingReservationsAppState, Checkout, LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { FormBaseComponent } from '@skysmack/portal-fields';
import { NgLodgingReservationsActions } from '@skysmack/ng-lodging-reservations';
import { switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalObject, toLocalObject } from '@skysmack/framework';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { NgCheckoutFieldsConfig } from '../../checkout-fields-config';

@Component({
  selector: 'ss-checkout-form',
  templateUrl: './checkout-form.component.html'
})
export class CheckoutFormComponent extends FormBaseComponent<LodgingReservationsAppState, Checkout, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public skysmackStore: NgSkysmackStore,
    public actions: NgLodgingReservationsActions,
    public fieldsConfig: NgCheckoutFieldsConfig,
    @Inject(MAT_DIALOG_DATA) private data: { packagePath: string, reservation: LocalObject<LodgingReservation, number> }) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  protected setCreateFields() {
    this.fields$ = this.loadedPackage$.pipe(
      switchMap(_package => this.fieldsConfig.getFields(_package, toLocalObject(new Checkout({
        reservationId: this.data.reservation.object.id,
        lodgingId: this.data.reservation.object.lodgingId,
        reservation: this.data.reservation.object
      }))))
    );
  }

  protected onSubmit(fh: FormHelper): void {
    fh.formValid(() => {
      const checkout = this.extractFormValues(fh);
      const entity = this.data.reservation;
      checkout.object.reservationId = entity.object.id;
      this.actions.checkOut(this.packagePath, entity, [entity.object.id]);
      this.editorNavService.hideEditorNav();
    });
  }
}
