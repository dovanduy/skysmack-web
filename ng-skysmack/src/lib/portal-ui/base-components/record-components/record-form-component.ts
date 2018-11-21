import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record, LocalObject } from '@skysmack/framework';
import { FieldsConfig } from 'lib/portal-ui/fields/fields-config';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { FormBaseComponent } from '../form-base-component';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { FormHelper } from 'lib/portal-ui/forms/form-helper';
import { map } from 'rxjs/operators';
import { NgRecordReduxStore } from 'lib/ng-redux/redux-stores/ng-record-redux-store';

export class RecordFormComponent<TAppState, TRecord extends Record<TKey>, TKey> extends FormBaseComponent<TAppState, TRecord, TKey> implements OnInit, OnDestroy {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public editorNavService: EditorNavService,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackRedux,
        public store: NgRecordReduxStore<TAppState, TRecord, TKey>,
        public fieldsConfig: FieldsConfig<TRecord>
    ) {
        super(router, activatedRoute, editorNavService, actions, redux, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
        this.editorNavService.showEditorNav();
    }

    ngOnDestroy() {
        this.editorNavService.hideEditorNav();
        super.ngOnDestroy();
    }

    public initRecordCreateComponent() {
        this.fields = this.getFields();
    }

    public initRecordEditComponent() {
        this.actions.getSingle(this.path, this.entityId);
        this.subscriptionHandler.subscribe(this.store.getSingle(this.path, this.entityId).pipe(
            map(entity => {
                this.selectedEntity = entity;
                return this.getFields(entity);
            })
        ).subscribe(fields => this.fields = fields));
    }

    public onCreateSubmit(fh: FormHelper) {
        this.create(fh);
    }

    public onUpdateSubmit(fh: FormHelper) {
        this.update(fh);
    }

    protected create(fh: FormHelper) {
        this.validateForm(fh, () => {
            this.actions.add<TRecord, TKey>([this.extractFormValues(fh)], this.path);
            this.editorNavService.hideEditorNav();
        });
    }

    protected update(fh: FormHelper) {
        this.validateForm(fh, () => {
            const oldValue = { ...this.selectedEntity };
            const newValue = this.extractFormValues(fh, this.selectedEntity);
            newValue.oldObject = oldValue.object;
            this.actions.update<TRecord, TKey>([newValue], this.path);
            this.editorNavService.hideEditorNav();
        });
    }
}
