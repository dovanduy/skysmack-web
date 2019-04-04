import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record, LocalObject } from '@skysmack/framework';
import { EntityFieldsConfig } from '@skysmack/ng-ui';
import { EditorNavService } from './../../components/common/container/editor-nav.service';
import { FormBaseComponent } from './../form-base-component';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { FormHelper } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

export class RecordFormComponent<TAppState, TRecord extends Record<TKey>, TKey> extends FormBaseComponent<TAppState, TRecord, TKey> implements OnInit, OnDestroy {

    public editorItem: LocalObject<TRecord, TKey>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: EntityActions<any, TKey>,
        public skysmackStore: NgSkysmackStore,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey>
    ) {
        super(router, activatedRoute, editorNavService, actions, skysmackStore, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnDestroy() {
        this.editorNavService.hideEditorNav();
        super.ngOnDestroy();
    }

    protected setCreateFields() {
        this.fields$ = combineLatest(
            this.skysmackStore.getEditorItem(),
            this.loadedPackage$
        ).pipe(
            map(values => {
                this.editorItem = values[0] as LocalObject<TRecord, TKey>;
                const loadedPackage = values[1];

                return this.fieldsConfig.getFields(loadedPackage, this.editorItem);
            })
        );
    }

    protected setEditFields() {
        this.fields$ =
            combineLatest(
                this.initEditRecord(),
                this.skysmackStore.getEditorItem(),
                this.loadedPackage$
            ).pipe(
                map(values => {
                    const entity = values[0];
                    this.editorItem = values[1] as LocalObject<TRecord, TKey>;
                    const loadedPackage = values[2];
                    this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;

                    return this.fieldsConfig.getFields(loadedPackage, this.selectedEntity);
                })
            );
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
            this.actions.add([localObject], this.packagePath);
            this.editorNavService.hideEditorNav();
        });
    }

    protected update(fh: FormHelper) {
        fh.formValid(() => {
            const oldValue = { ...this.selectedEntity };
            const newValue = this.extractFormValues(fh, this.selectedEntity);
            newValue.oldObject = oldValue.object;
            this.actions.update([newValue], this.packagePath);
            this.editorNavService.hideEditorNav();
        });
    }
    //#endregion
}
