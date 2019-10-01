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
}
