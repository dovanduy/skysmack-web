import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormRule } from '@skysmack/ng-ui';
import { LocalObject, LocalObjectStatus } from '@skysmack/framework';
import { ProductType } from '@skysmack/packages-products';
import { Field } from '@skysmack/ng-ui';

import { DocumentFieldsConfig, StringFieldComponent, HiddenFieldComponent } from '@skysmack/portal-ui';
import { NgProductTypesValidation } from '@skysmack/ng-packages';
import { NgFieldStore, LoadedPackage } from '@skysmack/ng-redux';
import { FieldProviders } from '@skysmack/portal-ui';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NgProductTypesFieldsConfig extends DocumentFieldsConfig<ProductType, number> {
    public validation = new NgProductTypesValidation();

    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        public fieldsStore: NgFieldStore,
        public router: Router
    ) {
        super(fieldProviders, fieldsStore, router);
    }


    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<ProductType, number>): Field[] {
        const fields = [
            new Field({
                component: StringFieldComponent,
                value: entity ? entity.object.name : undefined,
                key: 'name',
                validators: [Validators.required],
                order: 1,
                showColumn: true
            })
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
