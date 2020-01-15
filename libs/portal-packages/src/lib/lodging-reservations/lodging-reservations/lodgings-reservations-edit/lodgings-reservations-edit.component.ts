import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgLodgingsActions, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgLodgingReservationsStore, NgLodgingReservationsActions } from '@skysmack/ng-lodging-reservations';
import { NgFieldActions } from '@skysmack/ng-framework';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { LocalObjectStatus } from '@skysmack/framework';

@Component({
  selector: 'ss-lodgings-reservations-edit',
  templateUrl: './lodgings-reservations-edit.component.html'
})
export class LodgingsReservationsEditComponent extends DocumentRecordFormComponent<LodgingReservationsAppState, LodgingReservation, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingReservationsStore,
    public actions: NgLodgingReservationsActions,
    public lodgingsActions: NgLodgingsActions,
    public lodgingTypesActions: NgLodgingTypesActions,
    public fieldsConfig: NgLodgingReservationsFieldsConfig,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  protected update(fh: FormHelper) {
    fh.formValid(() => {
      const oldValue = { ...this.selectedEntity };

      // Remove null values, as the backend currently fails or has strange behavior when included.
      const clonedValues = JSON.parse(JSON.stringify(fh.form.getRawValue()));
      Object.keys(clonedValues).forEach(key => {
        const value = clonedValues[key]
        if (value === null || value === undefined || value === 'null' || value === 'undefined') {
          delete clonedValues[key]
        }
        this.formatExtendedData(key, clonedValues);
      });

      this.selectedEntity.object = clonedValues;
      this.selectedEntity.oldObject = oldValue.object;
      this.selectedEntity.status = LocalObjectStatus.MODIFYING;
      this.actions.update([this.selectedEntity], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
