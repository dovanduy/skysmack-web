import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { LodgingsAppState, Lodging } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from '@skysmack/ng-packages';
import { NgLodgingsFieldsConfig, NgLodgingFormDependencies } from '@skysmack/ng-packages';
import { NgLodgingsStore } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { NgLodgingTypesActions } from '@skysmack/ng-packages';
import { NgLodgingTypesStore } from '@skysmack/ng-packages';
import { PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgFieldActions, NgFieldReduxStore } from '@skysmack/ng-redux';
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
    public store: NgLodgingsStore,
    public actions: NgLodgingsActions,
    public lodgingTypeStore: NgLodgingTypesStore,
    public lodgingTypeActions: NgLodgingTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingsFieldsConfig,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldReduxStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public setCreateFields() {
    this.lodgingTypeActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.initCreateDocRecord(),
      this.lodgingTypeStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const dynamicFields = values[0];
        const availableLodgingTypes = values[1];
        return this.fieldsConfig.getFields(undefined, dynamicFields, { availableLodgingTypes });
      })
    );
  }

}
