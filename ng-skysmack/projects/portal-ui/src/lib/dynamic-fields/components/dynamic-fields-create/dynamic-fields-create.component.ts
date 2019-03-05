import { Component, OnInit, Injector } from '@angular/core';
import { FieldState } from '@skysmack/redux';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from './../../../components/common/container/editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgDynamicFieldsFieldsConfig, NgDynamicFieldFormDependencies } from './../../ng-dynamic-fields-config';
import { RecordFormComponent } from './../../../base-components/record-components/record-form-component';
import { NgFieldActions, NgFieldReduxStore } from '@skysmack/ng-redux';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';

@Component({
  selector: 'ss-dynamic-fields-create',
  templateUrl: './dynamic-fields-create.component.html',
  styleUrls: ['./dynamic-fields-create.component.scss']
})
export class DynamicFieldsCreateComponent extends RecordFormComponent<FieldState, any, string, NgDynamicFieldFormDependencies> implements OnInit {
  public objectIdentifier = 'key';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgFieldActions,
    public store: NgFieldReduxStore,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgDynamicFieldsFieldsConfig,
    public injector: Injector
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public setCreateFields() {
    this.actions.getAvailableFields(this.packagePath);

    this.fields$ = combineLatest(
      this.store.getAvailableFields(this.packagePath),
      this.skysmackStore.getEditorItem()
    ).pipe(
      map(values => {
        const availableFields = values[0];
        this.editorItem = values[1] as LocalObject<FieldSchemaViewModel, string>;

        return this.fieldsConfig.getFields(this.editorItem, undefined, { availableFields });
      })
    );
  }
}
