import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
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
import { PagedQuery, toLocalObject } from '@skysmack/framework';
import { Field } from '@skysmack/ng-ui';
import { FieldProviders } from '@skysmack/ng-ui';

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
    public fieldsConfig: NgLodgingReservationsFieldsConfig,
    public fieldProviders: FieldProviders
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  protected getProvidedFields(packagePath: string): Observable<Field[]> {
    return combineLatest(
      this.fieldProviders.providers.map(provider => {
        return provider.getFields(packagePath);
      })
    ).pipe(
      map((values: [Field[]]) => {
        return values.reduce((acc: Field[], cur: Field[]) => acc.concat(cur), []);
      })
    );
  }

  public setCreateFields() {
    // TODO: Find better way to prevent multiple requests getting fired...
    let requested = false;

    this.fields$ = this.loadedPackage$.pipe(
      switchMap(loadedPackage => {
        if (!requested) {
          this.lodgingsActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
          this.lodgingTypesActions.getPaged(loadedPackage._package.dependencies[0], new PagedQuery());
          requested = true;
        }

        return combineLatest(
          this.lodgingsStore.get(loadedPackage._package.dependencies[0]),
          this.lodgingTypesStore.get(loadedPackage._package.dependencies[0]),
          this.getProvidedFields(this.packagePath)
        );
      }),
      map(values => {
        const availableLodgings = values[0];
        const availableLodgingTypes = values[1];
        const providedFields = values[2];

        return this.fieldsConfig.getFields(undefined, undefined, { availableLodgings, availableLodgingTypes }).concat(providedFields);
      })
    );
  }
}
