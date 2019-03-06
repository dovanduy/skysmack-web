import { Component, OnInit, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldState } from '@skysmack/redux';
import { NgFieldReduxStore, NgFieldActions } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { EditorNavService } from './../../../components/common/container/editor-nav.service';
import { NgFieldsConfig, NgFieldFormDependencies } from './../../ng-fields-config';
import { RecordFormComponent } from './../../../base-components/record-components/record-form-component';

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
    public store: NgFieldReduxStore,
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
}
