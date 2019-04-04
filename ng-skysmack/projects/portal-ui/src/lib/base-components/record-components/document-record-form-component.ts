import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { EditorNavService } from './../../components/common/container/editor-nav.service';
import { NgSkysmackStore, LoadedPackage } from '@skysmack/ng-packages';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { RecordFormComponent } from './record-form-component';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { EntityFieldsConfig } from '../../fields/entity-fields-config';

export class DocumentRecordFormComponent<TAppState, TRecord extends Record<TKey>, TKey> extends RecordFormComponent<TAppState, TRecord, TKey> implements OnInit, OnDestroy {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: EntityActions<any, TKey>,
        public skysmackStore: NgSkysmackStore,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey>,
        public fieldActions: NgFieldActions,
        public fieldStore: NgFieldStore
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
            this.skysmackStore.getEditorItem(),
            this.loadedPackage$
        ).pipe(
            map(values => {
                const fields = values[0];
                this.editorItem = values[1] as LocalObject<TRecord, TKey>;
                const loadedPackage = values[2];
                return this.fieldsConfig.getFields(loadedPackage, this.editorItem, fields);
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
                const loadedPackage = values[0][2];
                this.editorItem = values[1] as LocalObject<TRecord, TKey>;
                this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;
                return this.fieldsConfig.getFields(loadedPackage, this.selectedEntity, fields);
            })
        );
    }

    // Use these init functions and override set functions in the component when the form has dependencies
    protected initCreateDocRecord(): Observable<LocalObject<FieldSchemaViewModel, string>[]> {
        this.fieldActions.getPaged(this.packagePath, this.pagedQuery);
        return this.fieldStore.get(this.packagePath);
    }

    protected initEditDocRecord(): Observable<[LocalObject<TRecord, TKey>, LocalObject<FieldSchemaViewModel, string>[], LoadedPackage]> {
        this.actions.getSingle(this.packagePath, this.entityId);
        this.fieldActions.getPaged(this.packagePath, this.pagedQuery);

        return combineLatest(
            this.store.getSingle(this.packagePath, this.entityId),
            this.fieldStore.get(this.packagePath),
            this.loadedPackage$
        ).pipe(map(values => {
            this.selectedEntity = values[0];
            return values;
        }));
    }
}
