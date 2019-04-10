import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { NgLodgingReservationsStore, NgSkysmackStore, NgLodgingReservationsActions, NgLodgingsActions, NgLodgingTypesActions, LoadedPackage } from '@skysmack/ng-packages';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { PagedQuery, defined } from '@skysmack/framework';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';
import { NgFieldActions } from '@skysmack/ng-redux';

@Component({
  selector: 'ss-lodgings-reservations-edit',
  templateUrl: './lodgings-reservations-edit.component.html'
})
export class LodgingsReservationsEditComponent extends RecordFormComponent<LodgingReservationsAppState, LodgingReservation, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingReservationsStore,
    public actions: NgLodgingReservationsActions,
    public lodgingsActions: NgLodgingsActions,
    public lodgingTypesActions: NgLodgingTypesActions,
    public fieldsConfig: NgLodgingReservationsFieldsConfig
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  public getDeps() {
    this.loadedPackage$.pipe(
      defined(),
      map((loadedPackage: LoadedPackage) => {
        this.lodgingsActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
        this.lodgingTypesActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
      }),
      take(1)
    ).subscribe();
  }
}