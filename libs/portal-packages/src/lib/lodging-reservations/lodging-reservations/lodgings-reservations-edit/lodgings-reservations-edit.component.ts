import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgLodgingsActions, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgLodgingReservationsStore, NgLodgingReservationsActions } from '@skysmack/ng-lodging-reservations';
import { NgFieldActions, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { LocalObjectStatus, jsonPrint } from '@skysmack/framework';
import { map, tap } from 'rxjs/operators';

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

      // Clone values to ensure immutability.
      const clonedValues = JSON.parse(JSON.stringify(fh.form.getRawValue()));

      // Remove null values, as the backend currently fails or has strange behavior when included.
      Object.keys(clonedValues).forEach(key => {
        const value = clonedValues[key];
        // Remove null values EXCEPT for lodgingId. If it is null, it's because the user wants to remove it.
        if (!(key === 'lodgingId') && value === null || value === undefined || value === 'null' || value === 'undefined') {
          delete clonedValues[key]
        }
        this.formatExtendedData(key, clonedValues);
      });

      // Update extended data if any
      const extendedData = clonedValues['extendedData'];
      if (extendedData) {
        // Get the persons packagePath
        const personPackagePath = Object.keys(extendedData)[0].split('.')[0];
        // Set the ids (originals).
        const ids: number[] = extendedData[`${personPackagePath}.ids`];
        let attachedIds: number[] = extendedData[`${personPackagePath}.attach`] ? extendedData[`${personPackagePath}.attach`] : [];
        let detachIds: number[] = [];

        ids.forEach(id => {
          if (!attachedIds.includes(id)) {
            // Its no longer present in attach - remove it.
            detachIds.push(id);
          } else {
            // Its still attached - ensure we don't send the same id again.
            attachedIds = attachedIds && attachedIds.filter(attachId => attachId !== id);
          }
        });

        // If there is still attach/detach ids, update the extendedData with them. Otherwise, ensure extended data doesn't have the props anymore.
        attachedIds.length > 0 ? extendedData[`${personPackagePath}.attach`] = attachedIds : delete extendedData[`${personPackagePath}.attach`];
        detachIds.length > 0 ? extendedData[`${personPackagePath}.detach`] = detachIds : delete extendedData[`${personPackagePath}.detach`];

        // Ids are not needed for puts. Don't send it.
        delete extendedData[`${personPackagePath}.ids`];

        clonedValues['extendedData'] = extendedData;
      }


      // Remaining update logic
      this.selectedEntity.object = clonedValues;
      this.selectedEntity.oldObject = oldValue.object;
      this.selectedEntity.status = LocalObjectStatus.MODIFYING;
      this.actions.update([this.selectedEntity], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
