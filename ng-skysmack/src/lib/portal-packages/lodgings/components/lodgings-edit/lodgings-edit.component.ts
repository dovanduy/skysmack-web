import { Component, OnInit } from '@angular/core';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { DocumentRecordFormComponent } from 'lib/portal-ui/base-components/record-components/document-record-form-component';
import { LodgingsAppState, Lodging } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from 'lib/ng-packages/lodgings/redux/ng-lodgings-actions';
import { NgLodgingsFieldsConfig, NgLodgingFormDependencies } from 'lib/ng-packages/lodgings/ng-lodgings-fields-config';
import { NgLodgingsStore } from 'lib/ng-packages/lodgings/redux/ng-lodgings-store';
import { NgLodgingTypesActions } from 'lib/ng-packages/lodgings/redux/ng-lodging-types-actions';
import { NgLodgingTypesStore } from 'lib/ng-packages/lodgings/redux/ng-lodgings-types-store';
import { PagedQuery } from '@skysmack/framework';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-lodgings-edit',
  templateUrl: './lodgings-edit.component.html',
  styleUrls: ['./lodgings-edit.component.scss']
})
export class LodgingsEditComponent extends DocumentRecordFormComponent<LodgingsAppState, Lodging, number, NgLodgingFormDependencies> implements OnInit {

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
    this.setEditFields();
  }

  public setEditFields() {
    this.lodgingTypeActions.getPaged(this.packagePath, new PagedQuery());

    this.subscriptionHandler.register(combineLatest(
      this.initEditDocRecord(),
      this.lodgingTypeStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const entity = values[0][0];
        const dynamicFields = values[0][1];
        const availableLodgingTypes = values[1];
        return this.getFields(entity, dynamicFields, { availableLodgingTypes });
      })
    ).subscribe(fields => this.fields = fields));
  }
}
