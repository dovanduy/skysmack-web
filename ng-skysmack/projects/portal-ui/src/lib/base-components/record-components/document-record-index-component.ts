import { Router, ActivatedRoute } from '@angular/router';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { OnInit } from '@angular/core';
import { Record } from '@skysmack/framework';
import { RecordIndexComponent } from './record-index-component';
import { NgFieldActions } from '@skysmack/ng-redux';
import { switchMap } from 'rxjs/operators';
import { EntityFieldsConfig } from '../../fields/entity-fields-config';

export class DocumentRecordIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends RecordIndexComponent<TAppState, TRecord, TKey> implements OnInit {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: EntityActions<any, TKey>,
        public redux: NgSkysmackStore,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey>,
        public fieldActions: NgFieldActions
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
        this.fields$ = this.loadedPackage$.pipe(
            switchMap(loadedPackage => this.fieldsConfig.getFields(loadedPackage))
        );
    }
}
