import { Observable } from 'rxjs/internal/Observable';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityBase } from './entity-base';
import { LocalObject, RSQLFilterBuilder, SortBuilder } from '@skysmack/framework';
import { FieldsConfig } from '../fields/fields-config';
import { DocumentFieldsConfig } from '../fields/document-fields-config';

export class EntityCrudIndex extends EntityBase implements OnInit {
    public entities$: Observable<LocalObject<any>[]>;
    public createdEntities$: Observable<LocalObject<any>[]>;
    public filterBuilder: RSQLFilterBuilder;
    public sortBuilder: SortBuilder;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public redux: any, // Why BaseRedux
        public fieldsConfig: FieldsConfig,
    ) {
        super(router, activatedRoute, redux);
    }

    ngOnInit() {
        super.ngOnInit();
        this.getDependencies();
    }

    /**
     * Listens for and fires entity actions when set in the component.
     * @param event Event emitted from the ss-data-table
     */
    public actionEvent(event: { action: Function, value: LocalObject<any>, _this: any }) {
        event.action(event.value, event._this);
    }

    /**
     * Gets entities, and optionally fields, needed for the CRUD.
     */
    public getDependencies() {
        // Get entities
        this.entities$ = this.redux.get(this.path);

        // Get fields
        if ((this.fieldsConfig as DocumentFieldsConfig).getDynamicFields) {
            this.subscriptionHandler.subscribe(this.redux.fields(this.path).subscribe());
        }
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
        this.redux.remove(entity, this.path);
    }
}
