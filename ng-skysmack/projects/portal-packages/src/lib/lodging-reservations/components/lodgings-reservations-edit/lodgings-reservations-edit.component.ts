import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { NgLodgingReservationFormDependencies, NgLodgingReservationsStore, NgLodgingsStore, NgLodgingTypesStore, NgLodgingReservationsFieldsConfig, NgSkysmackStore, NgLodgingReservationsActions, NgLodgingsActions, NgLodgingTypesActions } from '@skysmack/ng-packages';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { PagedQuery } from '@skysmack/framework';

@Component({
  selector: 'ss-lodgings-reservations-edit',
  templateUrl: './lodgings-reservations-edit.component.html',
  styleUrls: ['./lodgings-reservations-edit.component.scss']
})
export class LodgingsReservationsEditComponent extends RecordFormComponent<LodgingReservationsAppState, LodgingReservation, number, NgLodgingReservationFormDependencies> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingReservationsStore,
    public lodgingsStore: NgLodgingsStore,
    public lodgingTypesStore: NgLodgingTypesStore,
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

  public setEditFields() {
    this.actions.getSingle(this.packagePath, this.entityId);

    this.fields$ = this.skysmackStore.getCurrentPackage(this.packagePath).pipe(
      switchMap(loadedPackage => {
        this.lodgingsActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
        this.lodgingTypesActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
        return combineLatest(
          this.store.getSingle(this.packagePath, this.entityId),
          this.lodgingsStore.get(loadedPackage._package.dependencies[0]),
          this.lodgingTypesStore.get(loadedPackage._package.dependencies[0])
        );
      }),
      map(values => {
        const entity = values[0];
        const availableLodgings = values[1];
        const availableLodgingTypes = values[2];
        this.selectedEntity = entity;

        return this.fieldsConfig.getFields(entity, undefined, { availableLodgings, availableLodgingTypes });
      })
    );
  }
}
