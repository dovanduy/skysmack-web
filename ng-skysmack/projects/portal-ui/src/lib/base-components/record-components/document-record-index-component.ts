import { Router, ActivatedRoute } from '@angular/router';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { OnInit } from '@angular/core';
import { Record, getFieldStateKey } from '@skysmack/framework';
import { RecordIndexComponent } from './record-index-component';
import { NgFieldActions } from '@skysmack/ng-redux';
import { EntityFieldsConfig } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { NgFieldStore } from '@skysmack/ng-redux';
import { combineLatest } from 'rxjs';

export class DocumentRecordIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends RecordIndexComponent<TAppState, TRecord, TKey> implements OnInit {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: EntityActions<any, TKey>,
        public redux: NgSkysmackStore,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey, any>,
        public fieldActions: NgFieldActions,
        public fieldStore: NgFieldStore
    ) {
        super(router, activatedRoute, actions, redux, store, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
        // TODO: Remove this when field pagination is fixed in the backend.
        const newPagedQuery = { ...this.pagedQuery };
        newPagedQuery.pageSize = 10;
        this.fieldActions.getPaged(this.packagePath, newPagedQuery, this.additionalPaths);
        this.setFields();
    }

    protected setFields() {
        this.fields$ = combineLatest(
            this.fieldStore.get(getFieldStateKey(this.packagePath, this.additionalPaths)),
            this.loadedPackage$
        ).pipe(
            map(values => {
                const [fields, loadedPackage] = values;
                return this.fieldsConfig.getFields(undefined, fields, this.fieldsConfig.getStaticFields(undefined, undefined, loadedPackage), loadedPackage);
            })
        );
    }
}
