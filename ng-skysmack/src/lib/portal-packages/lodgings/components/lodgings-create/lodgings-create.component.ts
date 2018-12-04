import { Component, OnInit } from '@angular/core';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { DocumentRecordFormComponent } from 'lib/portal-ui/base-components/record-components/document-record-form-component';
import { LodgingsAppState, Lodging } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from 'lib/ng-packages/lodgings/redux/ng-lodgings-actions';
import { NgLodgingsFieldsConfig, NgLodgingFormDependencies } from 'lib/ng-packages/lodgings/ng-lodgings-fields-config';
import { NgLodgingsStore } from 'lib/ng-packages/lodgings/redux/ng-lodgings-store';
import { combineLatest } from 'rxjs';
import { NgLodgingTypesActions } from 'lib/ng-packages/lodgings/redux/ng-lodging-types-actions';
import { NgLodgingTypesStore } from 'lib/ng-packages/lodgings/redux/ng-lodgings-types-store';
import { PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
@Component({
  selector: 'ss-lodgings-create',
  templateUrl: './lodgings-create.component.html',
  styleUrls: ['./lodgings-create.component.scss']
})
export class LodgingsCreateComponent extends DocumentRecordFormComponent<LodgingsAppState, Lodging, number, NgLodgingFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingsActions,
    public lodgingTypeActions: NgLodgingTypesActions,
    public redux: NgSkysmackRedux,
    public fieldsConfig: NgLodgingsFieldsConfig,
    public store: NgLodgingsStore,
    public lodgingTypeStore: NgLodgingTypesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public setCreateFields() {
    this.lodgingTypeActions.getPaged(this.packagePath, new PagedQuery());

    this.subscriptionHandler.subscribe(combineLatest(
      this.initCreateDocRecord(),
      this.lodgingTypeStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const dynamicFields = values[0];
        const availableLodgingTypes = values[1];
        return this.getFields(undefined, dynamicFields, { availableLodgingTypes });
      })
    ).subscribe(fields => this.fields = fields));
  }

}
