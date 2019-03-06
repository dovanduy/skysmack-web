import { Component, OnInit, Injector } from '@angular/core';
import { FieldState } from '@skysmack/redux';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from './../../../components/common/container/editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgFieldsConfig, NgFieldFormDependencies } from './../../ng-fields-config';
import { RecordFormComponent } from './../../../base-components/record-components/record-form-component';
import { NgFieldActions, NgFieldReduxStore } from '@skysmack/ng-redux';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalObject, FieldSchemaViewModel } from '@skysmack/framework';

@Component({
  selector: 'ss-fields-create',
  templateUrl: './fields-create.component.html',
  styleUrls: ['./fields-create.component.scss']
})
export class FieldsCreateComponent extends RecordFormComponent<FieldState, any, string, NgFieldFormDependencies> implements OnInit {
  public objectIdentifier = 'key';

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
