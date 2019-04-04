import { Component, OnInit, Injector } from '@angular/core';
import { FieldState } from '@skysmack/redux';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from './../../../components/common/container/editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgFieldsConfig } from './../../ng-fields-config';
import { RecordFormComponent } from './../../../base-components/record-components/record-form-component';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';
import { FormHelper } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-fields-create',
  templateUrl: './fields-create.component.html',
  styleUrls: ['./fields-create.component.scss']
})
export class FieldsCreateComponent extends RecordFormComponent<FieldState, any, string> implements OnInit {
  public objectIdentifier = 'key';

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
    this.setCreateFields();
  }

  protected create(fh: FormHelper) {
    fh.formValid(() => {
      const localObject = this.extractFormValues(fh);
      this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;
      this.actions.add([localObject], this.packagePath, this.additionalPaths);
      this.editorNavService.hideEditorNav();
    });
  }
}
