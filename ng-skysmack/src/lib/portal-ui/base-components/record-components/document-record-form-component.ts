import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Record } from '@skysmack/framework';
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
        public fieldsConfig: FieldsConfig<TRecord>,
        public store: NgDocumentRecordReduxStore<TAppState, TRecord, TKey>
    ) {
        super(router, activatedRoute, editorNavService, actions, redux, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
        this.getDocumentRecordFields();
    }

    public getDocumentRecordFields() {
        this.actions.getFields(this.path);
        const entity = undefined;
        this.subscriptionHandler.subscribe(this.store.getFields(this.path).pipe(
            map(dynamicFields => this.getFields(entity, dynamicFields))
        ).subscribe(fields => this.fields = fields));
    }
}
