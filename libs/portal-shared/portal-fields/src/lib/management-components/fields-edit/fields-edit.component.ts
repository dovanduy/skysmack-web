import { Component, OnInit, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldState } from '@skysmack/redux';
import { NgFieldStore, NgFieldActions } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgFieldsConfig } from './../../ng-fields-config';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { getFieldStateKey, LocalObjectStatus } from '@skysmack/framework';
import { RecordFormComponent } from '../../base-components/record-components/record-form-component';

@Component({
  selector: 'ss-portal-ui-fields-edit',
  templateUrl: './fields-edit.component.html'
})
export class FieldsEditComponent extends RecordFormComponent<FieldState, any, string> implements OnInit {
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
    this.actions.getAvailableFields(this.packagePath, this.additionalPaths);
    this.setEditFields();
  }

  protected initEditRecord() {
    this.actions.getSingle(this.packagePath, this.entityId, this.additionalPaths);
    return this.store.getSingle(getFieldStateKey(this.packagePath, this.additionalPaths), this.entityId);
  }

  protected update(fh: FormHelper) {
    fh.formValid(() => {
      const oldValue = { ...this.selectedEntity };
      const newValue = this.extractFormValues(fh, this.selectedEntity);
      newValue.oldObject = oldValue.object;
      newValue.status = LocalObjectStatus.MODIFYING;
      this.actions.update([newValue], this.packagePath, this.additionalPaths);
      this.editorNavService.hideEditorNav();
    });
  }
}