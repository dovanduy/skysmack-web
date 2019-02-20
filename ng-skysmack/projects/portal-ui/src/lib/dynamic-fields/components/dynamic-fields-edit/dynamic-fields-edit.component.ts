import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentRecordState, DocumentRecordActionsBase } from '@skysmack/redux';
import { Field, FormHelper } from '@skysmack/ng-ui';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { DynamicFieldRouteData, FieldSchemaViewModel, LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { BaseComponent } from './../../../base-components/base-component';
import { EditorNavService } from './../../../components/common/container/editor-nav.service';
import { NgDynamicFieldsFieldsConfig } from './../../ng-dynamic-fields-config';

@Component({
  selector: 'ss-portal-ui-dynamic-fields-edit',
  templateUrl: './dynamic-fields-edit.component.html',
  styleUrls: ['./dynamic-fields-edit.component.scss']
})
export class DynamicFieldsEditComponent extends BaseComponent<DocumentRecordState<any, any>, any> implements OnInit, OnDestroy {
  public fields: Field[];
  public actions: DocumentRecordActionsBase<any, any>;
  public store: NgDocumentRecordReduxStore<any, any, any>;
  public selectedField: LocalObject<FieldSchemaViewModel, string>;
  public editorItem: LocalObject<FieldSchemaViewModel, string>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgDynamicFieldsFieldsConfig,
    public injector: Injector
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscriptionHandler.register(this.activatedRoute.data.pipe(
      switchMap((data: DynamicFieldRouteData) => {
        this.store = this.injector.get(data.storeToken);
        this.actions = this.injector.get(data.actionToken);

        this.actions.getAvailableFields(this.packagePath);
        this.actions.getSingleField(this.packagePath, this.entityId);
        return combineLatest(
          this.store.getAvailableFields(this.packagePath),
          this.store.getSingleField(this.packagePath, this.entityId),
          this.skysmackStore.getEditorItem()
        );
      }),
      map(values => {
        const availableFields = values[0];
        const field = values[1];
        this.editorItem = values[2];
        this.editorItem ? this.selectedField = this.editorItem : this.selectedField = field;
        return this.fieldsConfig.getDynamicFields(availableFields, field);
      })
    ).subscribe(fields => this.fields = fields));

    this.editorNavService.showEditorNav();
  }

  public onEditSubmit(fh: FormHelper) {
    fh.formValid(() => {
      const oldValue = { ...this.selectedField };
      this.selectedField.object = fh.form.getRawValue();
      this.selectedField.status = LocalObjectStatus.MODIFYING;
      this.selectedField.oldObject = oldValue.object;
      this.actions.updateFields([this.selectedField], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }
}
