import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { DocumentRecordState, DocumentRecordActionsBase } from '@skysmack/redux';
import { BaseComponent } from './../../../base-components/base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from './../../../components/common/container/editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgDynamicFieldsFieldsConfig } from './../../ng-dynamic-fields-config';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';
import { map, switchMap } from 'rxjs/operators';
import { DynamicFieldRouteData, toLocalObject, FieldSchemaViewModel, LocalObjectStatus, log, LocalObject } from '@skysmack/framework';
import { FormHelper } from '@skysmack/ng-ui';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'ss-dynamic-fields-create',
  templateUrl: './dynamic-fields-create.component.html',
  styleUrls: ['./dynamic-fields-create.component.scss']
})
export class DynamicFieldsCreateComponent extends BaseComponent<DocumentRecordState<any, any>, any> implements OnInit, OnDestroy {
  public actions: DocumentRecordActionsBase<any, any>;
  public store: NgDocumentRecordReduxStore<any, any, any>;
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

    this.fields$ = this.activatedRoute.data.pipe(
      switchMap((data: DynamicFieldRouteData) => {
        this.store = this.injector.get(data.storeToken);
        this.actions = this.injector.get(data.actionToken);

        this.actions.getAvailableFields(this.packagePath);
        return combineLatest(
          this.skysmackStore.getEditorItem(),
          this.store.getAvailableFields(this.packagePath)
        );
      }),
      map(values => {
        this.editorItem = values[0] as LocalObject<FieldSchemaViewModel, string>;
        const availableFields = values[1];
        return this.fieldsConfig.getDynamicFields(availableFields, this.editorItem);
      }));

    this.editorNavService.showEditorNav();
  }

  onCreateSubmit(fh: FormHelper) {
    fh.formValid(() => {

      const localObject = toLocalObject<FieldSchemaViewModel, string>(
        fh.form.getRawValue(),
        'key',
        undefined,
        LocalObjectStatus.CREATING,
        undefined,
        true
      );

      this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;

      this.actions.addFields([localObject], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.editorNavService.hideEditorNav();
  }
}
