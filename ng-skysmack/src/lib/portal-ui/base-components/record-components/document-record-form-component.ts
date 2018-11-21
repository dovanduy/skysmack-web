import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record, log } from '@skysmack/framework';
import { FieldsConfig } from 'lib/portal-ui/fields/fields-config';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { RecordFormComponent } from './record-form-component';
import { NgDocumentRecordReduxStore } from 'lib/ng-redux/redux-stores/ng-document-record-redux-store';
import { map } from 'rxjs/operators';

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

    public initDocumentRecordCreateComponent() {
        this.actions.getFields(this.path);
        this.subscriptionHandler.subscribe(this.store.getFields(this.path).pipe(
            map(dynamicFields => this.getFields(undefined, dynamicFields))
        ).subscribe(fields => this.fields = fields));
    }

    public initDocumentRecordEditComponent() {
        this.actions.getSingle(this.path, this.entityId);
        this.subscriptionHandler.subscribe(this.store.getSingle(this.path, this.entityId).pipe(
            map(entity => {
                this.selectedEntity = entity;
                return this.getFields(entity);
            })
        ).subscribe(fields => this.fields = fields));
    }
}
