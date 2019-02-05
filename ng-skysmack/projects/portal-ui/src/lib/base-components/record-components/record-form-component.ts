import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record, LocalObject } from '@skysmack/framework';
import { FieldsConfig } from '@skysmack/ng-ui';
import { EditorNavService } from './../../components/common/container/editor-nav.service';
import { FormBaseComponent } from './../form-base-component';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { FormHelper } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { NgRecordReduxStore } from '@skysmack/ng-redux';

export class RecordFormComponent<TAppState, TRecord extends Record<TKey>, TKey, TDependencies> extends FormBaseComponent<TAppState, TRecord, TKey, TDependencies> implements OnInit, OnDestroy {

    public editorItem: LocalObject<TRecord, TKey>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackStore,
        public store: NgRecordReduxStore<TAppState, TRecord, TKey>,
        public fieldsConfig: FieldsConfig<TRecord, TDependencies>
    ) {
        super(router, activatedRoute, editorNavService, actions, redux, fieldsConfig);
    }

    ngOnInit() {
        this.editorNavService.showEditorNav();
        super.ngOnInit();
    }

    ngOnDestroy() {
        this.editorNavService.hideEditorNav();
        super.ngOnDestroy();
    }

    protected setCreateFields() {
        this.fields = this.getFields();
    }

    protected setEditFields() {
        this.subscriptionHandler.register(this.initEditRecord().pipe(
            map(entity => {
                this.selectedEntity = entity;
                return this.getFields(entity);
            })
        ).subscribe(fields => this.fields = fields));
    }

    protected initEditRecord() {
        this.actions.getSingle(this.packagePath, this.entityId);
        return this.store.getSingle(this.packagePath, this.entityId);
    }

    //#region default form submission
    public onCreateSubmit(fh: FormHelper) {
        this.create(fh);
    }

    public onUpdateSubmit(fh: FormHelper) {
        this.update(fh);
    }

    protected create(fh: FormHelper) {
        fh.formValid(() => {
            const localObject = this.extractFormValues(fh);
            this.editorItem ? localObject.localId = this.editorItem.localId : localObject.localId = localObject.localId;
            this.actions.add<TRecord, TKey>([localObject], this.packagePath);
            this.editorNavService.hideEditorNav();
        });
    }

    protected update(fh: FormHelper) {
        fh.formValid(() => {
            const oldValue = { ...this.selectedEntity };
            const newValue = this.extractFormValues(fh, this.selectedEntity);
            newValue.oldObject = oldValue.object;
            this.actions.update<TRecord, TKey>([newValue], this.packagePath);
            this.editorNavService.hideEditorNav();
        });
    }
    //#endregion
}
