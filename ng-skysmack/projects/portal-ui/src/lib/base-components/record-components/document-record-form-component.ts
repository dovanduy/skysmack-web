import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { EntityFieldsConfig } from '@skysmack/ng-ui';
import { EditorNavService } from './../../components/common/container/editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { RecordFormComponent } from './record-form-component';
import { NgFieldActions, NgFieldReduxStore } from '@skysmack/ng-redux';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

export class DocumentRecordFormComponent<TAppState, TRecord extends Record<TKey>, TKey, TDependencies> extends RecordFormComponent<TAppState, TRecord, TKey, TDependencies> implements OnInit, OnDestroy {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: EntityActions<any, TKey>,
        public skysmackStore: NgSkysmackStore,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey, TDependencies>,
        public fieldActions: NgFieldActions,
        public fieldStore: NgFieldReduxStore
    ) {
        super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    // Use these set functions in the component when the form has no dependencies
    protected setCreateFields() {
        this.fields$ = combineLatest(
            this.initCreateDocRecord(),
            this.skysmackStore.getEditorItem()
        ).pipe(
            map(values => {
                const fields = values[0];
                this.editorItem = values[1] as LocalObject<TRecord, TKey>;
                return this.fieldsConfig.getFields(this.editorItem, fields);
            })
        );
    }

    protected setEditFields() {
        this.fields$ = combineLatest(
            this.initEditDocRecord(),
            this.skysmackStore.getEditorItem()
        ).pipe(
            map(values => {
                const entity = values[0][0];
                const fields = values[0][1];
                this.editorItem = values[1] as LocalObject<TRecord, TKey>;
                this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;

                return this.fieldsConfig.getFields(this.selectedEntity, fields);
            })
        );
    }

    // Use these init functions and override set functions in the component when the form has dependencies
    protected initCreateDocRecord(): Observable<LocalObject<FieldSchemaViewModel, string>[]> {
        this.fieldActions.getPaged(this.packagePath, this.pagedQuery);
        return this.fieldStore.get(this.packagePath);
    }

    protected initEditDocRecord(): Observable<[LocalObject<TRecord, TKey>, LocalObject<FieldSchemaViewModel, string>[]]> {
        this.actions.getSingle(this.packagePath, this.entityId);
        this.fieldActions.getPaged(this.packagePath, this.pagedQuery);

        return combineLatest(
            this.store.getSingle(this.packagePath, this.entityId),
            this.fieldStore.get(this.packagePath)
        ).pipe(map(values => {
            this.selectedEntity = values[0];
            return values;
        }));
    }
}
