import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { LodgingsAppState, Lodging } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from '@skysmack/ng-packages';
import { NgLodgingsFieldsConfig, NgLodgingFormDependencies } from '@skysmack/ng-packages';
import { NgLodgingsStore } from '@skysmack/ng-packages';
import { NgLodgingTypesActions } from '@skysmack/ng-packages';
import { NgLodgingTypesStore } from '@skysmack/ng-packages';
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
    public redux: NgSkysmackStore,
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

    this.fields$ = combineLatest(
      this.initEditDocRecord(),
      this.lodgingTypeStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const entity = values[0][0];
        const dynamicFields = values[0][1];
        const availableLodgingTypes = values[1];
        this.selectedEntity = entity;
        return this.fieldsConfig.getFields(entity, dynamicFields, { availableLodgingTypes });
      })
    );
  }
}
