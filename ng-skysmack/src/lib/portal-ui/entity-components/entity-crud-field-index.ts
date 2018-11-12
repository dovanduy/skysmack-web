import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityBase } from './entity-base';
import { LocalObject } from '@skysmack/framework';
import { FieldSchemaViewModel } from '../fields/field-schema-view-model';

export class EntityCrudFieldIndex extends EntityBase implements OnInit {
    /**
     * Fields to show on the index page.
     */
    protected fields$: Observable<LocalObject<FieldSchemaViewModel>[]>;

    /**
     * Dynamic fields CRUD display columns
     */
    public displayedColumns = ['display'];

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public redux: any,// Was BaseRedux
    ) {
        super(router, activatedRoute, redux);
    }

    ngOnInit() {
        super.ngOnInit();
        this.getDependencies();
    }

    /**
     * Gets fields and available fields needed for the fields CRUD.
     */
    public getDependencies() {
        this.fields$ = this.redux.fields(this.path);
        this.redux.availableFields(this.path);
    }

    /**
     * Gets the fields observable.
     * Seemingly reduntant function, but the stream won't update
     * when using cancel action unless the entities are looped...
     */
    public getFields() {
        return this.fields$.pipe(map(x => x));
    }

    /**
     * Angular track by function used to track field local objects in ngFor loops.
     */
    public trackByFieldKey(index, item: LocalObject<FieldSchemaViewModel>) {
        return item ? item.object.key : undefined;
    }

    /**
     * Deletes a field.
     * @param field The field to delete.
     */
    public deleteField(field: LocalObject<FieldSchemaViewModel>) {
        this.redux.removeField(field, this.path);
    }
}
