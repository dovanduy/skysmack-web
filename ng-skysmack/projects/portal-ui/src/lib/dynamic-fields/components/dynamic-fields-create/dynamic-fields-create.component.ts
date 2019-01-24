import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { DocumentRecordState, DocumentRecordActionsBase } from '@skysmack/redux';
import { BaseComponent } from './../../../base-components/base-component';
import { Field } from '@skysmack/ng-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from './../../../components/common/container/editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgDynamicFieldsFieldsConfig } from './../../ng-dynamic-fields-config';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';
import { map, switchMap } from 'rxjs/operators';
import { DynamicFieldRouteData, toLocalObject, FieldSchemaViewModel, LocalObjectStatus, log } from '@skysmack/framework';
import { FormHelper } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-dynamic-fields-create',
  templateUrl: './dynamic-fields-create.component.html',
  styleUrls: ['./dynamic-fields-create.component.scss']
})
export class DynamicFieldsCreateComponent extends BaseComponent<DocumentRecordState<any, any>, any> implements OnInit, OnDestroy {
  public fields: Field[];
  public actions: DocumentRecordActionsBase<any, any>;
  public store: NgDocumentRecordReduxStore<any, any, any>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgDynamicFieldsFieldsConfig,
    public injector: Injector
  ) {
    super(router, activatedRoute, redux);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscriptionHandler.register(this.activatedRoute.data.pipe(
      switchMap((data: DynamicFieldRouteData) => {
        this.store = this.injector.get(data.storeToken);
        this.actions = this.injector.get(data.actionToken);

        this.actions.getAvailableFields(this.packagePath);
        return this.store.getAvailableFields(this.packagePath);
      }),
      map(availableFields => this.fieldsConfig.getDynamicFields(availableFields)),
    ).subscribe(fields => this.fields = fields));

    this.editorNavService.showEditorNav();
  }

  onCreateSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.actions.addFields([toLocalObject<FieldSchemaViewModel, string>(
        fh.form.getRawValue(),
        'key',
        undefined,
        LocalObjectStatus.CREATING,
        undefined,
        true
      )], this.packagePath);
      this.editorNavService.hideEditorNav();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.editorNavService.hideEditorNav();
  }
}
