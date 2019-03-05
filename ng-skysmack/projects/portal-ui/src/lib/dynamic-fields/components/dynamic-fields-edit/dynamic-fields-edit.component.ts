import { Component, OnInit, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldState } from '@skysmack/redux';
import { NgFieldReduxStore, NgFieldActions } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { EditorNavService } from './../../../components/common/container/editor-nav.service';
import { NgDynamicFieldsFieldsConfig, NgDynamicFieldFormDependencies } from './../../ng-dynamic-fields-config';
import { RecordFormComponent } from './../../../base-components/record-components/record-form-component';

@Component({
  selector: 'ss-portal-ui-dynamic-fields-edit',
  templateUrl: './dynamic-fields-edit.component.html',
  styleUrls: ['./dynamic-fields-edit.component.scss']
})
export class DynamicFieldsEditComponent extends RecordFormComponent<FieldState, any, string, NgDynamicFieldFormDependencies> implements OnInit {
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
    this.setEditFields();
  }
}
