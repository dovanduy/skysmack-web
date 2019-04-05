import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import {
  NgLodgingReservationsStore,
  NgSkysmackStore,
  NgLodgingReservationsActions,
  NgLodgingsActions,
  NgLodgingTypesActions,
  LoadedPackage
} from '@skysmack/ng-packages';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { PagedQuery, defined } from '@skysmack/framework';
import { FieldProviders } from '@skysmack/ng-ui';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';

@Component({
  selector: 'ss-lodgings-reservations-create',
  templateUrl: './lodgings-reservations-create.component.html',
  styleUrls: ['./lodgings-reservations-create.component.scss']
})
export class LodgingsReservationsCreateComponent extends RecordFormComponent<LodgingReservationsAppState, LodgingReservation, number> implements OnInit {
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
    public fieldProviders: FieldProviders
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getDeps();
    this.setCreateFields();
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
