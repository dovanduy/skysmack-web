import { Component, OnInit } from '@angular/core';
import { EntityCrudForm } from 'framework';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from 'ui';
import { LodgingsReservationsFeatureRedux } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-redux/lodgings-reservations-feature-redux';
import { LodgingsReservationsFeatureFieldsConfig } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-fields-config';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LodgingsRedux, LodgingTypesRedux } from 'packages';

@Component({
  selector: 'ss-lodgings-reservations-create',
  templateUrl: './lodgings-reservations-create.component.html',
  styleUrls: ['./lodgings-reservations-create.component.scss']
})
export class LodgingsReservationsCreateComponent extends EntityCrudForm implements OnInit {

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
          this.lodgingsRedux.get(_package.url, undefined, true),
          this.lodgingsTypeRedux.get(_package.url, undefined, true)
        );
      }),
      map(values => {
        const availableLodgings = values[0];
        const availableLodgingTypes = values[1];

        return this.getFields(undefined, undefined, { availableLodgings, availableLodgingTypes });
      })
    ).subscribe(fields => this.fields = fields));
  }
}
