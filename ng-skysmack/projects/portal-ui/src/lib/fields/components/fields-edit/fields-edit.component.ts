import { Component, OnInit, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldState } from '@skysmack/redux';
import { NgFieldStore, NgFieldActions } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { EditorNavService } from './../../../components/common/container/editor-nav.service';
import { NgFieldsConfig, NgFieldFormDependencies } from './../../ng-fields-config';
import { RecordFormComponent } from './../../../base-components/record-components/record-form-component';
import { FormHelper } from '@skysmack/ng-ui';
import { getFieldStateKey, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-portal-ui-fields-edit',
  templateUrl: './fields-edit.component.html',
  styleUrls: ['./fields-edit.component.scss']
})
export class FieldsEditComponent extends RecordFormComponent<FieldState, any, string, NgFieldFormDependencies> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgFieldActions,
    public store: NgFieldStore,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgFieldsConfig,
    public injector: Injector
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }

  protected initEditRecord() {
    this.actions.getSingle(this.packagePath, this.entityId, this.additionalPaths);
    return this.store.getSingle(getFieldStateKey(this.packagePath, this.additionalPaths), this.entityId);
  }

  protected setEditFields() {
    this.actions.getAvailableFields(this.packagePath, this.additionalPaths);

    this.fields$ =
      combineLatest(
        this.initEditRecord(),
        this.skysmackStore.getEditorItem(),
        this.store.getAvailableFields(getFieldStateKey(this.packagePath, this.additionalPaths))
      ).pipe(
        map(values => {
          const entity = values[0];
          this.editorItem = values[1] as LocalObject<FieldSchemaViewModel, string>;
          const availableFields = values[2];
          this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;

          return this.fieldsConfig.getFields(this.selectedEntity, undefined, { availableFields });
        })
      );
  }

  protected update(fh: FormHelper) {
    fh.formValid(() => {
      const oldValue = { ...this.selectedEntity };
      const newValue = this.extractFormValues(fh, this.selectedEntity);
      newValue.oldObject = oldValue.object;
      this.actions.update([newValue], this.packagePath, this.additionalPaths);
      this.editorNavService.hideEditorNav();
    });
  }
}
