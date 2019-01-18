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
import { combineLatest, Observable } from 'rxjs';

export class DocumentRecordFormComponent<TAppState, TRecord extends Record<TKey>, TKey, TDependencies> extends RecordFormComponent<TAppState, TRecord, TKey, TDependencies> implements OnInit, OnDestroy {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: DocumentRecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackStore,
        public store: NgDocumentRecordReduxStore<TAppState, TRecord, TKey>,
        public fieldsConfig: FieldsConfig<TRecord, TDependencies>
    ) {
        super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    // Use these set functions in the component when the form has no dependencies
    protected setCreateFields() {
        this.subscriptionHandler.register(this.initCreateDocRecord().subscribe(fields => this.fields = this.getFields(undefined, fields)));
    }

    protected setEditFields() {
        this.subscriptionHandler.register(this.initEditDocRecord().pipe(
            map(values => {
                const entity = values[0];
                const dynamicFields = values[1];
                return this.getFields(entity, dynamicFields);
            })
        ).subscribe(fields => this.fields = fields));
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
