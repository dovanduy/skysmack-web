import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { FieldsConfig } from '@skysmack/ng-ui';
import { EditorNavService } from './../../components/common/container/editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { RecordFormComponent } from './record-form-component';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';
import { map } from 'rxjs/operators';
import { combineLatest, Observable, zip } from 'rxjs';

export class DocumentRecordFormComponent<TAppState, TRecord extends Record<TKey>, TKey, TDependencies> extends RecordFormComponent<TAppState, TRecord, TKey, TDependencies> implements OnInit, OnDestroy {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: DocumentRecordActionsBase<TAppState, NgRedux<TAppState>>,
        public skysmackStore: NgSkysmackStore,
        public store: NgDocumentRecordReduxStore<TAppState, TRecord, TKey>,
        public fieldsConfig: FieldsConfig<TRecord, TDependencies>
    ) {
        super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    // Use these set functions in the component when the form has no dependencies
    protected setCreateFields() {
        this.subscriptionHandler.register(
            combineLatest(
                this.initCreateDocRecord(),
                this.skysmackStore.getEditorItem()
            ).pipe(
                map(values => {
                    const fields = values[0];
                    this.editorItem = values[1] as LocalObject<TRecord, TKey>;
                    this.fields = this.getFields(this.editorItem, fields);
                })
            ).subscribe());
    }

    protected setEditFields() {
        this.subscriptionHandler.register(
            combineLatest(
                this.initEditDocRecord(),
                this.skysmackStore.getEditorItem()
            ).pipe(
                map(values => {
                    const entity = values[0][0];
                    const fields = values[0][1];
                    this.editorItem = values[1] as LocalObject<TRecord, TKey>;
                    this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;

                    this.fields = this.getFields(this.selectedEntity, fields);
                })
            ).subscribe());
    }

    // Use these init functions and override set functions in the component when the form has dependencies
    protected initCreateDocRecord(): Observable<LocalObject<FieldSchemaViewModel, string>[]> {
        this.actions.getFields(this.packagePath);
        return this.store.getFields(this.packagePath);
    }

    protected initEditDocRecord(): Observable<[LocalObject<TRecord, TKey>, LocalObject<FieldSchemaViewModel, string>[]]> {
        this.actions.getSingle(this.packagePath, this.entityId);
        this.actions.getFields(this.packagePath);

        return combineLatest(
            this.store.getSingle(this.packagePath, this.entityId),
            this.store.getFields(this.packagePath)
        ).pipe(map(values => {
            this.selectedEntity = values[0];
            return values;
        }));
    }
}
