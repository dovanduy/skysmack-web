import { Component, OnInit } from '@angular/core';
import { EntityCrudForm } from 'framework';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from 'ui';
import { LodgingsReservationsFeatureRedux } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-redux';
import { LodgingsReservationsFeatureFieldsConfig } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-fields-config';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { LodgingsRedux, LodgingTypesRedux } from 'packages';

@Component({
  selector: 'ss-lodgings-reservations-edit',
  templateUrl: './lodgings-reservations-edit.component.html',
  styleUrls: ['./lodgings-reservations-edit.component.scss']
})
export class LodgingsReservationsEditComponent extends EntityCrudForm implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public redux: LodgingsReservationsFeatureRedux,
    public lodgingsRedux: LodgingsRedux,
    public lodgingsTypeRedux: LodgingTypesRedux,
    public fieldsConfig: LodgingsReservationsFeatureFieldsConfig
  ) {
    super(router, activatedRoute, editorNavService, redux, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.createForm();
  }

  public createForm() {
    this.subscriptionHandler.subscribe(this.redux.getFeatureDependencyPackage(this.path).pipe(
      switchMap(_package => {
        return combineLatest(
          this.redux.get(this.path, this.entityId),
          this.lodgingsRedux.get(_package.url, undefined, true),
          this.lodgingsTypeRedux.get(_package.url, undefined, true)
        );
      }),
      map(values => {
        const entity = values[0];
        const availableLodgings = values[1];
        const availableLodgingTypes = values[2];

        return this.getFields(entity, undefined, { availableLodgings, availableLodgingTypes });
      })
    ).subscribe(fields => this.fields = fields));
  }
}
