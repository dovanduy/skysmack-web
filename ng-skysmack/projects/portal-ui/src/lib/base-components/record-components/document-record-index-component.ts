import { Router, ActivatedRoute } from '@angular/router';
import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { OnInit } from '@angular/core';
import { Record } from '@skysmack/framework';
import { RecordIndexComponent } from './record-index-component';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';
import { FieldsConfig } from '@skysmack/ng-ui';

export class DocumentRecordIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends RecordIndexComponent<TAppState, TRecord, TKey> implements OnInit {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: DocumentRecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackStore,
        public store: NgDocumentRecordReduxStore<TAppState, TRecord, TKey>,
        public fieldsConfig?: FieldsConfig<TRecord, TKey, any>
    ) {
        super(router, activatedRoute, actions, redux, store, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
        this.actions.getFields(this.packagePath);
    }
}
