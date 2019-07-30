import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record, LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { EditorNavService } from '@skysmack/portal-ui';
import { FormBaseComponent } from './../form-base-component';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { switchMap, take, tap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { EntityFieldsConfig } from '@skysmack/ng-fields';

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
        this.setSidebarCloseUrl();
        super.ngOnInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    protected setSidebarCloseUrl() {
        this.activatedRoute.url.pipe(
            map((pathSegments: UrlSegment[]) => {
                const nonEmptyPathSegments = pathSegments.filter(x => x.path.length > 0).map(x => x.path);
                if (nonEmptyPathSegments.length > 0) {
                    this.editorNavService.redirectPath = this.router.url.substring(0, this.router.url.length - nonEmptyPathSegments.join('/').length - 1);
                } else {
                    this.editorNavService.redirectPath = '';
                }
            }),
            take(1)
        ).subscribe();
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
        this.fields$ =
            combineLatest(
                this.initEditRecord(),
                this.skysmackStore.getEditorItem(),
                this.loadedPackage$
            ).pipe(
                switchMap(values => {
                    const entity = values[0];
                    this.selectedEntity = entity;
                    this.editorItem = values[1] as LocalObject<TRecord, TKey>;
                    const loadedPackage = values[2];
                    this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;
                    return this.fieldsConfig.getFields(loadedPackage, this.selectedEntity);
                }),
            );
    }

    protected initEditRecord() {
        this.actions.getSingle(this.packagePath, this.entityId);
        return this.store.getSingle(this.packagePath, this.entityId).pipe(take(1));
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
            newValue.status = LocalObjectStatus.MODIFYING;
            this.actions.update([newValue], this.packagePath);
            this.editorNavService.hideEditorNav();
        });
    }
    //#endregion
}