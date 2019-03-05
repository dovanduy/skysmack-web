import { Router, ActivatedRoute } from '@angular/router';
import { EntityActions, EntityStore } from '@skysmack/redux';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { OnInit } from '@angular/core';
import { Record } from '@skysmack/framework';
import { RecordIndexComponent } from './record-index-component';
import { NgFieldActions } from '@skysmack/ng-redux';
import { EntityFieldsConfig } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { NgFieldReduxStore } from '@skysmack/ng-redux';

export class DocumentRecordIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends RecordIndexComponent<TAppState, TRecord, TKey> implements OnInit {

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: EntityActions<any, TKey>,
        public redux: NgSkysmackStore,
        public store: EntityStore<any, TKey>,
        public fieldsConfig: EntityFieldsConfig<any, TKey, any>,
        public fieldActions: NgFieldActions,
        public fieldStore: NgFieldReduxStore
    ) {
        super(router, activatedRoute, actions, redux, store, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
        this.fieldActions.getPaged(this.packagePath, this.pagedQuery);
        this.setFields();
    }

    protected setFields() {
        this.fields$ = this.fieldStore.get(this.packagePath).pipe(
            map(dynamicFields => this.fieldsConfig.getFields(undefined, dynamicFields, this.fieldsConfig.getStaticFields()))
        );
    }
}
