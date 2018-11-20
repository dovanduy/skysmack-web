import { Router, ActivatedRoute } from '@angular/router';
import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { OnInit } from '@angular/core';
import { Record } from '@skysmack/framework';
import { RecordIndexComponent } from './record-index-component';
import { NgDocumentRecordReduxStore } from 'lib/ng-redux/redux-stores/ng-document-record-redux-store';

export class DocumentRecordIndexComponet<TAppState, TRecord extends Record<TKey>, TKey> extends RecordIndexComponent<TAppState, TRecord, TKey> implements OnInit {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: DocumentRecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackRedux,
        public store: NgDocumentRecordReduxStore<TAppState, TRecord, TKey>
    ) {
        super(router, activatedRoute, actions, redux, store);
    }

    ngOnInit() {
        super.ngOnInit();
        this.actions.getFields(this.path);
    }
}
