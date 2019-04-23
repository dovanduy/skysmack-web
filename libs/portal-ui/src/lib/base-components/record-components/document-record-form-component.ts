import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record, LocalObject } from '@skysmack/framework';
import { EditorNavService } from './../../components/common/container/editor-nav.service';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { RecordFormComponent } from './record-form-component';
import { NgFieldActions } from '@skysmack/ng-redux';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { EntityFieldsConfig } from '../../fields/entity-fields-config';
import { LoadedPackage } from '@skysmack/ng-redux';

export class DocumentRecordFormComponent<TAppState, TRecord extends Record<TKey>, TKey> extends RecordFormComponent<TAppState, TRecord, TKey> implements OnInit, OnDestroy {
    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: EntityActions<any, TKey>,
        public skysmackStore: NgSkysmackStore,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey>,
        public fieldActions: NgFieldActions
    ) {
        super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
        this.fieldActions.getPaged(this.packagePath, this.pagedQuery);
    }

    protected setCreateFields() {
        this.fields$ = combineLatest(
            this.skysmackStore.getEditorItem(),
            this.loadedPackage$
        ).pipe(
            switchMap(values => {
                this.editorItem = values[0] as LocalObject<TRecord, TKey>;
                const loadedPackage = values[1];
                return this.fieldsConfig.getFields(loadedPackage, this.editorItem);
            })
        );
    }

    protected setEditFields() {
        this.fields$ = combineLatest(
            this.initEditDocRecord(),
            this.skysmackStore.getEditorItem()
        ).pipe(
            switchMap(values => {
                const entity = values[0][0];
                const loadedPackage = values[0][1];
                this.editorItem = values[1] as LocalObject<TRecord, TKey>;
                this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;
                return this.fieldsConfig.getFields(loadedPackage, this.selectedEntity);
            })
        );
    }

    protected initEditDocRecord(): Observable<[LocalObject<TRecord, TKey>, LoadedPackage]> {
        this.actions.getSingle(this.packagePath, this.entityId);

        return combineLatest(
            this.store.getSingle(this.packagePath, this.entityId),
            this.loadedPackage$
        ).pipe(map(values => {
            this.selectedEntity = values[0];
            return values;
        }));
    }
}