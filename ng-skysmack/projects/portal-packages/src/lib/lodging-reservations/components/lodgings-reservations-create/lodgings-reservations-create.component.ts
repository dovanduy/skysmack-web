import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  NgLodgingReservationFormDependencies,
  NgLodgingReservationsStore,
  NgLodgingsStore,
  NgLodgingTypesStore,
  NgLodgingReservationsFieldsConfig,
  NgSkysmackStore,
  NgLodgingReservationsActions,
  NgLodgingsActions,
  NgLodgingTypesActions
} from '@skysmack/ng-packages';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { PagedQuery } from '@skysmack/framework';

@Component({
  selector: 'ss-lodgings-reservations-create',
  templateUrl: './lodgings-reservations-create.component.html',
  styleUrls: ['./lodgings-reservations-create.component.scss']
})
export class LodgingsReservationsCreateComponent extends RecordFormComponent<LodgingReservationsAppState, LodgingReservation, number, NgLodgingReservationFormDependencies> implements OnInit {
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
    this.setCreateFields();
  }

  public setCreateFields() {
    this.fields$ = this.skysmackStore.getCurrentPackage(this.packagePath).pipe(
      switchMap(loadedPackage => {
        this.lodgingsActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
        this.lodgingTypesActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());

        return combineLatest(
          this.lodgingsStore.get(loadedPackage._package.dependencies[0]),
          this.lodgingTypesStore.get(loadedPackage._package.dependencies[0])
        );
      }),
      map(values => {
        const availableLodgings = values[0];
        const availableLodgingTypes = values[1];

        return this.fieldsConfig.getFields(undefined, undefined, { availableLodgings, availableLodgingTypes });
      })
    );
  }
}
