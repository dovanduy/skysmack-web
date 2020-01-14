import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgLodgingReservationsStore, NgLodgingReservationsActions } from '@skysmack/ng-lodging-reservations';
import { NgLodgingsActions, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { NgFieldActions } from '@skysmack/ng-framework';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { toLocalObject } from '@skysmack/framework';

@Component({
  selector: 'ss-lodgings-reservations-create',
  templateUrl: './lodgings-reservations-create.component.html'
})
export class LodgingsReservationsCreateComponent extends DocumentRecordFormComponent<LodgingReservationsAppState, LodgingReservation, number> implements OnInit {
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
    this.setCreateFields();
  }

  protected create(fh: FormHelper) {
    fh.formValid(() => {
      // Remove null values, as the backend currently fails or has strange behavior when included.
      const clonedValues = JSON.parse(JSON.stringify(fh.form.getRawValue()));
      Object.keys(clonedValues).forEach(key => {
        const value = clonedValues[key]
        if (value === null || value === undefined || value === 'null' || value === 'undefined') {
          delete clonedValues[key]
        }
        this.formatExtendedData(key, clonedValues);
      });

      const localObject = toLocalObject(clonedValues);
      localObject.object.extendedData
      this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;
      this.actions.add([localObject], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}


//  {
//   "checkIn": "2020-01-14",
//   "checkOut": "2020-01-15",
//   "lodgingTypeId": 1,
//   "lodgingId": 2,
//   "persons": 5,
//   "status": 0,
//   "overbook": false,
//   "extendedData__customers.attach": [
//     1
//   ],
//   "extendedData__customers.add": null,
//   "extendedData__customers.ids": null
// } 