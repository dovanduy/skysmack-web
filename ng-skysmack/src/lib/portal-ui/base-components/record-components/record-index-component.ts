import { BaseComponent } from '../base-component';
import { Router, ActivatedRoute } from '@angular/router';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack';
import { LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgRecordReduxStore } from 'lib/ng-redux/redux-stores/ng-record-redux-store';
import { OnInit } from '@angular/core';
import { Record } from '@skysmack/framework';

export class RecordIndexComponent<TAppState, TRecord extends Record<TKey>, TKey> extends BaseComponent<TAppState, TKey> implements OnInit {
    public entities$: Observable<LocalObject<TRecord>[]>;
    public createdEntities$: Observable<LocalObject<any>[]>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public redux: NgSkysmackRedux,
        public store: NgRecordReduxStore<TAppState, TRecord, TKey>
    ) {
        super(router, activatedRoute, actions, redux);
    }

    ngOnInit() {
        super.ngOnInit();
        this.getEntities();
        this.getFields();
    }

    /**
     * Listens for and fires entity actions when set in the component.
     * @param event Event emitted from the ss-data-table
     */
    public actionEvent(event: { action: Function, value: LocalObject<any>, _this: any }) {
        event.action(event.value, event._this);
    }

    /**
     * Angular track by function used to track local objects in ngFor loops.
     */
    public trackByObjectId(index, item: LocalObject<any>) {
        return item ? item.object.id : undefined;
    }

    /**
     * Deletes an entity
     * @param entity The entity to delete.
     */
    public delete = (entity: LocalObject<any>): void => {
        // this.redux.remove(entity, this.path);
    }

    private getEntities() {
        this.entities$ = this.store.get(this.path);
    }

    private getFields() {

        // TODO: Fix

        // if ((this.fieldsConfig as DocumentFieldsConfig).getDynamicFields) {
        //     this.subscriptionHandler.subscribe(this.redux.fields(this.path).subscribe());
        // }
    }
}
