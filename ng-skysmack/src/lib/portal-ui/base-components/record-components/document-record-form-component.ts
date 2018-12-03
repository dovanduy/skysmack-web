import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { FieldsConfig } from 'lib/portal-ui/fields/fields-config';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { RecordFormComponent } from './record-form-component';
import { NgDocumentRecordReduxStore } from 'lib/ng-redux/redux-stores/ng-document-record-redux-store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

export class DocumentRecordFormComponent<TAppState, TRecord extends Record<TKey>, TKey> extends RecordFormComponent<TAppState, TRecord, TKey> implements OnInit, OnDestroy {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: DocumentRecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackRedux,
        public store: NgDocumentRecordReduxStore<TAppState, TRecord, TKey>,
        public fieldsConfig: FieldsConfig<TRecord>,
    ) {
        super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
    }


    protected setCreateFields() {
        this.subscriptionHandler.subscribe(this.initCreateDocRecord().subscribe(fields => this.fields = this.getFields(undefined, fields)));
    }

    protected setEditFields() {
        this.subscriptionHandler.subscribe(this.initEditDocRecord().pipe(
            map(values => {
                const entity = values[0];
                const dynamicFields = values[1];

                return this.getFields(entity, dynamicFields);
            })
        ).subscribe(fields => this.fields = fields));
    }

    protected initCreateDocRecord(): Observable<LocalObject<FieldSchemaViewModel>[]> {
        this.actions.getFields(this.packagePath);
        return this.store.getFields(this.packagePath);
    }

    protected initEditDocRecord(): Observable<[LocalObject<TRecord>, LocalObject<FieldSchemaViewModel>[]]> {
        this.actions.getSingle(this.packagePath, this.entityId);
        this.actions.getFields(this.packagePath);

        return combineLatest(
            this.store.getSingle(this.packagePath, this.entityId),
            this.store.getFields(this.packagePath)
        );
    }

    // Old
    protected initDocumentRecordCreateComponent() {
        this.actions.getFields(this.packagePath);
        this.subscriptionHandler.subscribe(this.store.getFields(this.packagePath).pipe(
            map(dynamicFields => this.getFields(undefined, dynamicFields))
        ).subscribe(fields => this.fields = fields));
    }

    // Old
    protected initDocumentRecordEditComponent() {
        this.actions.getSingle(this.packagePath, this.entityId);
        this.actions.getFields(this.packagePath);
        this.subscriptionHandler.subscribe(combineLatest(
            this.store.getSingle(this.packagePath, this.entityId),
            this.store.getFields(this.packagePath),
        ).pipe(
            map(values => {
                const entity = values[0];
                const dynamicFields = values[1];

                this.selectedEntity = entity;
                return this.getFields(entity, dynamicFields);
            })
        ).subscribe(fields => this.fields = fields));
    }
}
